import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Result_page from "../result_page/Result_page";
import "./quiz_style.css";

var disableAll = false,
  correctAnswerMarker = 0,
  avoidDuplicates = 0;

const Quiz_page = ({ questions }) => {
  //var correctAnswer = questions[0].answer;
  const [question, setQuestion] = useState(questions[0].question);
  const [options, setOptions] = useState(...questions[0].options);
  const [questionCounter, setquestionCounter] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [nextBtnVisible, setNextBtnVisible] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    getCurrentQuestionObj(questions[questionCounter]);
  }, [questionCounter]);

  return !isGameOver ? (
    <div className="quiz_box">
      <header>
        <div className="title">YOS QUIZ</div>
        <div className="timer">
          <div className="time_left_txt">Time Left</div>
          <div className="timer_sec">15</div>
        </div>
        <div className="time_line"></div>
      </header>
      <section>
        <div class="que_text">
          <span>{question}</span>
        </div>
        <div className="option_list">
          <div class="option_list">
            <div
              class={
                !disableAll
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
              <div class="icon tick hidden">
                <i class="fas fa-check"></i>
              </div>
              <div class="icon cross hidden">
                <i class="fas fa-times"></i>
              </div>
            </div>
            <div
              class={
                !disableAll
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
              <div class="icon tick hidden">
                <i class="fas fa-check"></i>
              </div>
              <div class="icon cross hidden">
                <i class="fas fa-times"></i>
              </div>
            </div>
            <div
              class={
                !disableAll
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
              <div class="icon tick hidden">
                <i class="fas fa-check"></i>
              </div>
              <div class="icon cross hidden">
                <i class="fas fa-times"></i>
              </div>
            </div>
            <div
              class={
                !disableAll
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
              <div class="icon tick hidden">
                <i class="fas fa-check"></i>
              </div>
              <div class="icon cross hidden">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="total_que">
          <span>
            <p>{questionCounter + 1}</p> of <p>{questions.length}</p> Questions
          </span>
        </div>
        <button
          className={nextBtnVisible ? "next_btn btn" : "hidden"}
          onClick={nextBtnHandler}
        >
          Next Yos
        </button>
        <button
          className={
            questionCounter + 1 == questions.length ? "next_btn btn" : "hidden"
          }
          onClick={displayResult}
        >
          Finish
        </button>
      </footer>
    </div>
  ) : (
    <Result_page
      correctAnswerMarker={correctAnswerMarker}
      totalQuestions={questions.length}
    />
  );

  function displayResult() {
    setIsGameOver(true);
  }

  function checkIsCorrect(eachOption) {
    //  THIS COMPLEX LOGIC HERE IS TO AVOID THE DUPLICATES BECAUSE OF THE STATE REPEATING THE COUNT
    if (eachOption == selectedAnswer) {
      if (selectedAnswer == correctAnswer) {
        if (avoidDuplicates == 0) {
          correctAnswerMarker++;
          avoidDuplicates++;
        }
        avoidDuplicates++;
        if (avoidDuplicates == 3) {
          avoidDuplicates = 0;
        }
      }
    }
    return eachOption == correctAnswer;
  }
  function checkIsInCorrect(eachOption) {
    if (eachOption == selectedAnswer) {
      return selectedAnswer != correctAnswer;
    }
    return false;
  }
  function optionsHandler(_selectedAnswer) {
    disableAll = true;
    setSelectedAnswer(_selectedAnswer);
    if (questionCounter + 1 < questions.length) setNextBtnVisible(true);
  }

  function getCurrentQuestionObj(currentQuestion) {
    setQuestion(1 + questionCounter + ". " + currentQuestion.question);
    setOptions(currentQuestion.options);
    setCorrectAnswer(currentQuestion.answer);
  }
  function nextBtnHandler() {
    if (questionCounter < questions.length) {
      setquestionCounter(questionCounter + 1);
      disableAll = false;
      setNextBtnVisible(false);
    } else {
      //displayResult();
    }
  }
};

export default Quiz_page;
