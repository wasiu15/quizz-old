import "./result_style.css";
import React from "react";

const Result_page = () => {
  return (
    <div className="result_box">
      <div className="icon">
        <i className="fas fa-crown"></i>
      </div>
      <div className="complete_text">You've completed the Quiz!</div>
      <div className="score_text"></div>
      <div className="buttons">
        <button className="restart">Replay Quiz</button>
        <button className="quit">Quit Quiz</button>
      </div>
    </div>
  );
};

export default Result_page;
