import "./result_style.css";
import React from "react";
import { Link } from "react-router-dom";
import ComponentIndex from "../ComponentIndex";

const Result_page = ({ correctAnswerMarker, totalQuestions }) => {
  var score = correctAnswerMarker,
    totalQue = totalQuestions;
  var pass = "and congrats! 🎉 You got " + score + " out of " + totalQue;
  var average = "and nice 😎 You got " + score + " out of " + totalQue;
  var fail = "and sorry 😐 You got only " + score + " out of " + totalQue;
  return (
    <div className="result_box">
      <div className="icon">
        <i className="fas fa-crown"></i>
      </div>
      <div className="complete_text">You've completed the Quiz!</div>
      <div class="score_text">
        <span>{score > 3 ? pass : score == 3 ? average : fail}</span>
      </div>
      <div className="buttons">
        <Link to="/quiz_page" className="restart btn">
          Replay Quiz
        </Link>
        <Link to="/start_page" className="quit btn">
          Quit Quiz
        </Link>
      </div>
    </div>
  );
};

// function restart() {
//   quiz_box.classList.add("activeQuiz"); //show quiz box
//   result_box.classList.remove("activeResult"); //hide result box
//   timeValue = 15;
//   que_count = 0;
//   que_numb = 1;
//   userScore = 0;
//   widthValue = 0;
//   showQuetions(que_count); //calling showQestions function
//   queCounter(que_numb); //passing que_numb value to queCounter
//   clearInterval(counter); //clear counter
//   clearInterval(counterLine); //clear counterLine
//   startTimer(timeValue); //calling startTimer function
//   startTimerLine(widthValue); //calling startTimerLine function
//   timeText.textContent = "Time Left"; //change the text of timeText to Time Left
//   next_btn.classList.remove("show"); //hide the next button
// }

export default Result_page;
