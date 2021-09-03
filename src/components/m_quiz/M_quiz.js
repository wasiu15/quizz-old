import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { HOME_URL } from "../../api";
import M_Result_page from "../result_page/M_Result_page";

const socket = io("http://localhost:7000");

var disableAll = false,
  avoidDuplicates = 0,
  counterLine,
  doOnce = "doOnce",
  nextBtnIsClicked = 0;
var isMarked = false;
var doPlayerOnce = true;
var stage = "2";
var whoseTurn = "home";
var doWhoseTurnOnce = true;
var homeScore = 0;
var awayScore = 0;
var isCorrect = false;
var tempPayload = {};
var listHomeScore = [],
  listAwayScore = [];
var sendGameIsOver = false;
const M_quiz = ({
  questions,
  player,
  homeName,
  awayName,
  playerName,
  bookingCode,
}) => {
  const [question, setQuestion] = useState(questions[0].question);
  const [options, setOptions] = useState(...questions[0].options);
  const [numb, setNumb] = useState();
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
  const [p2SelectedOption, setp2SelectedOption] = useState("");
  const [disableForP2, setDisableForP2] = useState();
  const [p2Name, setp2Name] = useState("");
  const [homeName_, setHomeName_] = useState(homeName);
  const [awayName_, setAwayName_] = useState(awayName);
  const player_ = player;
  useEffect(() => {
    if (doPlayerOnce) {
      if (player == "home") {
        setDisableForP2(false);
      } else if (player == "away") {
        setDisableForP2(true);
      }
    }
    if (player !== whoseTurn) {
      clearTimer();
    }
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

  useEffect(() => {
    socket.on("message", (payload) => {
      console.log(payload.awayScore);
      if (bookingCode === payload.bookingCode) {
        tempPayload = {
          player: payload.player,
          number: payload.numb,
          isCorrect: payload.isCorrect,
        };
        if (payload.player == "home") {
          listHomeScore.push(tempPayload);
        } else if (payload.player == "away") {
          listAwayScore.push(tempPayload);
        }

        if (player !== "") {
          if (doPlayerOnce || (player !== payload.player && !isMarked)) {
            markAnswerFromP2(payload.p2SelectedOption);
          }
        }
      }
    });
  });

  function sendMessage() {
    if (player == whoseTurn) {
      if (finishBtnVisible) {
        console.log("Got in here haha :)");
        if (correctAnswer == p2SelectedOption) {
          awayScore = awayScore + 1;
        }
      }
      isCorrect = false;
      socket.emit("message", {
        stage,
        player,
        bookingCode,
        numb,
        p2SelectedOption,
        correctAnswer,
        isCorrect,
        sendGameIsOver,
      });
    }
  }

  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  function checkWhoseTurnOnce(input) {
    if (homeName_ == "") {
      setHomeName_("Your");
    }
    if (awayName_ == "") {
      setAwayName_("Opponet");
    }
    return player == input && doWhoseTurnOnce;
  }

  return !isGameOver ? (
    <div className="m_quiz_container">
      <div className="whoseTurnDiv">
        <p className="home">
          {checkWhoseTurnOnce("home")
            ? homeName_ + " Turn"
            : whoseTurn == player_
            ? homeName_ + " Turn"
            : ""}
        </p>
        <p className="away">
          {checkWhoseTurnOnce("away")
            ? awayName_ + " Turn"
            : whoseTurn !== player_
            ? awayName_ + " Turn"
            : ""}
        </p>
      </div>
      <div className="quiz_box">
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
    <M_Result_page
      homeScore={homeScore}
      awayScore={awayScore}
      player={player}
      playerName={playerName}
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
    sendMessage();
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
          avoidDuplicates++;
        }
        avoidDuplicates++;
        if (avoidDuplicates === 2) {
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
    console.log("");
    disableAll = true;
    setSelectedAnswer(_selectedAnswer);
    setp2SelectedOption(_selectedAnswer);

    clearTimer();
    if (questionCounter + 1 < questions.length) setNextBtnVisible(true);
    if (nextBtnIsClicked === questions.length - 1) {
      setFinishBtnVisible(true);
      console.log(homeScore, " = ", awayScore);
    }
  }

  function getCurrentQuestionObj(currentQuestion) {
    setQuestion(1 + questionCounter + ". " + currentQuestion.question);
    setOptions(currentQuestion.options);
    setCorrectAnswer(currentQuestion.answer);
    setNumb(currentQuestion.numb);
  }

  function nextBtnHandler() {
    isMarked = false;
    doPlayerOnce = false;
    doWhoseTurnOnce = false;
    disableAll = false;
    nextBtnIsClicked++;
    if (player == whoseTurn) {
      sendMessage();
    }
    console.log(awayScore);

    setNextQuestion();
  }
  function setNextQuestion() {
    if (whoseTurn == "home") {
      whoseTurn = "away";
    } else {
      whoseTurn = "home";
    }
    if (player == whoseTurn) {
      setDisableForP2(false);
      disableAll = false;
    } else {
      setDisableForP2(true);
    }
    if (questionCounter <= questions.length) {
      setQuestionCounter(questionCounter + 1);
      setNextBtnVisible(false);
      setFinishBtnVisible(false);
      time_line.style.width = "0px";
      setTimerDisplay(15);
      doOnce = "doOnce";
      callLooper();
    }
  }
  function clearTimer() {
    clearInterval(window.timerInterval);
    clearInterval(counterLine); //clear counterLine
  }

  function removeDuplicatesFromArray(arrayOfDuplicates) {
    let arrayOfQuestNumbers = [];
    arrayOfDuplicates.forEach((element) => {
      if (element.isCorrect == true) {
        arrayOfQuestNumbers.push(element.number);
      }
    });
    let uniArry = [...new Set(arrayOfQuestNumbers)];
    return uniArry.length;
  }
  function markAnswerFromP2(p2SelectedOption) {
    console.log("got here");
    if (!isGameOver) {
      homeScore = removeDuplicatesFromArray(listHomeScore);
      awayScore = removeDuplicatesFromArray(listAwayScore);
    }

    setSelectedAnswer(p2SelectedOption);
    optionsHandler(p2SelectedOption);
    setDisableForP2(false);
    disableAll = true;

    isMarked = true;
  }
};

export default M_quiz;
