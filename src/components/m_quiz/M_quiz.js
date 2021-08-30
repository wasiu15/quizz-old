import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Result_page from "../result_page/Result_page";
//import "./quiz_style.css";
import { HOME_URL } from "../../api";

const socket = io("http://localhost:7000");
const userName = "Booking code: SLJ23";

var disableAll = false,
  correctAnswerMarker = 0,
  avoidDuplicates = 0,
  counterLine,
  doOnce = "doOnce",
  nextBtnIsClicked = 0;

var doPlayerOnce = true;
const M_quiz = ({ questions, player, bookingCode }) => {
  const [question, setQuestion] = useState(questions[0].question);
  const [options, setOptions] = useState(...questions[0].options);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [nextBtnVisible, setNextBtnVisible] = useState(false);
  const [finishBtnVisible, setFinishBtnVisible] = useState(false);
  const time_line = document.querySelector(".time_line");
  const quiz_box = document.querySelector(".quiz_box");
  const [isGameOver, setIsGameOver] = useState(false);
  const [timerDisplay, setTimerDisplay] = useState(15);
  const [box_height, setBox_height] = useState(0);
  const [whoseTurn, setWhoseTurn] = useState(false);
  const [p2SelectedOption, setp2SelectedOption] = useState("");
  const [disableForP2, setDisableForP2] = useState(false);

  const [asPlayer2Join, setAsPlayer2Join] = useState("");
  useEffect(() => {
    if (disableForP2) {
      optionsHandler("B");
    }
    return () => {
      if (disableForP2) {
        optionsHandler("B");
        console.log("hey");
      }
    };
  }, [question]);
  useEffect(() => {
    getCurrentQuestionObj(questions[questionCounter]);
    setBox_height(document.querySelector(".quiz_box").clientHeight);
  }, [questionCounter]);
  callLooper();
  if (document.querySelector(".quiz_box")) {
    if (box_height === 0) {
      setBox_height(document.querySelector(".quiz_box").clientHeight);
    }
  }

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  const [optionFromServer, setOptionFromServer] = useState("");

  useEffect(() => {
    socket.on("message", (payload) => {
      //setChat([...chat, payload]);
      if (bookingCode === payload.bookingCode) {
        setOptionFromServer(payload);
        markAnswerFromP2(payload.p2SelectedOption);
      }
    });
    //console.log("options: ", optionFromServer);
  });

  function sendMessage() {
    //console.log(p2SelectedOption);
    socket.emit("message", { player, bookingCode, p2SelectedOption });
    //Send message on socket
    //setMessage("");
  }

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  return !isGameOver ? (
    <div className="m_quiz_container">
      <div className="whoseTurnDiv">
        <p className="home">{!whoseTurn ? "Your Turn" : ""}</p>
        <p className="away">{whoseTurn ? "Alfred Turn" : ""}</p>
      </div>
      <div className={box_height < 600 ? "quiz_box" : "quiz_box compressor"}>
        <header>
          <div className="title">YOS QUIZ</div>
          <div className="timer">
            <div className="time_left_txt">Time Left</div>
            <div className="timer_sec">{timerDisplay}</div>
          </div>
          <div className="time_line"></div>
        </header>
        <section>
          <div className="que_text">
            <span>{question}</span>
          </div>
          <div className="option_list">
            <div className="option_list">
              <div
                className={
                  disableForP2
                    ? "option disabled"
                    : !disableAll
                    ? "option"
                    : "option disabled" && checkIsCorrect("A")
                    ? "option correct disabled"
                    : "option disabled" && checkIsInCorrect("A")
                    ? "option incorrect disabled"
                    : "option disabled"
                }
                onClick={() => optionsHandler("A")}
              >
                <span>{options[0]}</span>
                <div className="icon tick hidden">
                  <i className="fas fa-check"></i>
                </div>
                <div className="icon cross hidden">
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div
                className={
                  disableForP2
                    ? "option disabled"
                    : !disableAll
                    ? "option"
                    : "option disabled" && checkIsCorrect("B")
                    ? "option correct disabled"
                    : "option disabled" && checkIsInCorrect("B")
                    ? "option incorrect disabled"
                    : "option disabled"
                }
                onClick={() => optionsHandler("B")}
              >
                <span>{options[1]}</span>
                <div className="icon tick hidden">
                  <i className="fas fa-check"></i>
                </div>
                <div className="icon cross hidden">
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div
                className={
                  disableForP2
                    ? "option disabled"
                    : !disableAll
                    ? "option"
                    : "option disabled" && checkIsCorrect("C")
                    ? "option correct disabled"
                    : "option disabled" && checkIsInCorrect("C")
                    ? "option incorrect disabled"
                    : "option disabled"
                }
                onClick={() => optionsHandler("C")}
              >
                <span>{options[2]}</span>
                <div className="icon tick hidden">
                  <i className="fas fa-check"></i>
                </div>
                <div className="icon cross hidden">
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div
                className={
                  disableForP2
                    ? "option disabled"
                    : !disableAll
                    ? "option"
                    : "option disabled" && checkIsCorrect("D")
                    ? "option correct disabled"
                    : "option disabled" && checkIsInCorrect("D")
                    ? "option incorrect disabled"
                    : "option disabled"
                }
                onClick={() => optionsHandler("D")}
              >
                <span>{options[3]}</span>
                <div className="icon tick hidden">
                  <i className="fas fa-check"></i>
                </div>
                <div className="icon cross hidden">
                  <i className="fas fa-times"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="total_que">
            <span>
              <p>{questionCounter + 1}</p> of <p>{questions.length}</p>{" "}
              Questions
            </span>
          </div>
          <button
            className={
              !nextBtnVisible
                ? "hidden"
                : questionCounter + 1 < questions.length
                ? "next_btn btn"
                : "hidden"
            }
            onClick={nextBtnHandler}
          >
            Next Yos
          </button>
          <button
            className={!finishBtnVisible ? "hidden" : "next_btn btn"}
            onClick={displayResult}
          >
            Finish
          </button>
        </footer>
      </div>
    </div>
  ) : (
    <Result_page
      correctAnswerMarker={correctAnswerMarker}
      totalQuestions={questions.length}
      navigateStart={navigateStart}
      navigateQuit={navigateQuit}
    />
  );

  function navigateStart() {
    window.location = HOME_URL.urlGame;
  }
  function navigateQuit() {
    window.location = HOME_URL.url;
  }
  function callLooper() {
    var borrowWidth = startTimerLine();
    startTimerSec(borrowWidth);
  }

  function startTimerLine() {
    if (time_line && doOnce === "doOnce") {
      doOnce = "stop";
      var time = 0;
      time_line.style.width = "0px";
      var width = quiz_box.clientWidth;
      counterLine = setInterval(timer, 29);

      function timer() {
        time++; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time === width) {
          clearInterval(counterLine);
        }
      }
      return width;
    }
  }

  function startTimerSec(fullWidth) {
    if (fullWidth) {
      var getTime = (fullWidth * 29) / 15;
      var t = 15;
      clearInterval(window.timerInterval);
      window.timerInterval = setInterval(function () {
        if (t > 0) {
          t--;
          setTimerDisplay(t);
        } else {
          stopCounterTimesUp();
        }
      }, getTime);
    }
  }

  function displayResult() {
    setIsGameOver(true);
  }
  function stopCounterTimesUp() {
    optionsHandler("Z");
  }

  function checkIsCorrect(eachOption) {
    //  THIS COMPLEX LOGIC HERE IS TO AVOID THE DUPLICATES BECAUSE OF THE STATE REPEATING THE COUNT
    if (eachOption === selectedAnswer) {
      if (selectedAnswer === correctAnswer) {
        if (avoidDuplicates === 0) {
          correctAnswerMarker++;
          avoidDuplicates++;
        }
        avoidDuplicates++;
        if (avoidDuplicates === 3) {
          avoidDuplicates = 0;
        }
      }
    }
    return eachOption === correctAnswer;
  }
  function checkIsInCorrect(eachOption) {
    if (eachOption === selectedAnswer) {
      return selectedAnswer !== correctAnswer;
    }
    return false;
  }
  function optionsHandler(_selectedAnswer) {
    setp2SelectedOption(_selectedAnswer);
    console.log("");
    disableAll = true;
    setSelectedAnswer(_selectedAnswer);
    clearInterval(window.timerInterval);
    clearInterval(counterLine); //clear counterLine
    if (questionCounter + 1 < questions.length) setNextBtnVisible(true);
    if (nextBtnIsClicked === questions.length - 1) setFinishBtnVisible(true);
  }

  function getCurrentQuestionObj(currentQuestion) {
    setQuestion(1 + questionCounter + ". " + currentQuestion.question);
    setOptions(currentQuestion.options);
    setCorrectAnswer(currentQuestion.answer);
  }

  function nextBtnHandler() {
    disableAll = false;
    nextBtnIsClicked++;

    if (questionCounter <= questions.length) {
      setQuestionCounter(questionCounter + 1);
      setNextBtnVisible(false);
      setFinishBtnVisible(false);
      time_line.style.width = "0px";
      setTimerDisplay(15);
      doOnce = "doOnce";
      callLooper();
    }

    if (doPlayerOnce) {
      if (player == "home") {
        setWhoseTurn(true);
      } else {
        setWhoseTurn(false);
      }
      doPlayerOnce = false;
    } else {
      setWhoseTurn(!whoseTurn);
    }
    if (!whoseTurn) {
      //console.log("got in");
      setDisableForP2(true);
      disableAll = false;
      setDisableForP2(false);
      clearInterval(window.timerInterval);
      clearInterval(counterLine); //clear counterLine
      // send the selected option to the database
      //waitingForP2();
      sendMessage();
    } else {
      setDisableForP2(false);
    }
  }

  function markAnswerFromP2(p2SelectedOption) {
    //get P2 selected options from the database
    if (true) {
      // AFTER GETTING DATA FROM DB
      optionsHandler(p2SelectedOption);
    }
  }
};

export default M_quiz;
