import "./result_style.css";
import React from "react";

const M_Result_page = ({
  homeScore,
  awayScore,
  player,
  playerName,
  navigateStart,
  navigateQuit,
}) => {
  var homeScore_ = homeScore,
    awayScore_ = awayScore;
  var pass =
    "and congrats! 🎉 " +
    playerName +
    " You Won! " +
    homeScore_ +
    " - " +
    awayScore_;
  var average =
    "its a draw 😎 " + playerName + " : " + homeScore_ + " - " + awayScore_;
  var fail =
    "and sorry 😐 You lost " +
    playerName +
    " : " +
    homeScore_ +
    " - " +
    awayScore_;
  var showPass = false,
    showAverage = false;
  if (player == "home") {
    if (homeScore_ > awayScore_) {
      showPass = true;
    } else if (homeScore == awayScore_) {
      showAverage = true;
    }
  } else if (player == "away") {
    if (awayScore_ > homeScore_) {
      showPass = true;
    } else if (homeScore == awayScore_) {
      showAverage = true;
    }
  }
  return (
    <div className="result_box">
      <div className="icon">
        <i className="fas fa-crown"></i>
      </div>
      <div className="complete_text">You've completed the Quiz!</div>
      <div className="score_text">
        <span>{showPass ? pass : showAverage ? average : fail}</span>
      </div>
      <div className="buttons multi_btn">
        <button onClick={navigateStart} className="restart btn">
          Replay Quiz
        </button>
        <button onClick={navigateQuit} className="quit btn">
          Quit Quiz
        </button>
      </div>
    </div>
  );
};

export default M_Result_page;
