import "./result_style.css";
import React from "react";
import { Link } from "react-router-dom";

const Result_page = () => {
  return (
    <div className="result_box">
      <div className="icon">
        <i className="fas fa-crown"></i>
      </div>
      <div className="complete_text">You've completed the Quiz!</div>
      <div className="score_text"></div>
      <div className="buttons">
        <Link to="./start_page" className="restart btn">
          Replay Quiz
        </Link>
        <Link to="./" className="quit btn">
          Quit Quiz
        </Link>
      </div>
    </div>
  );
};

export default Result_page;
