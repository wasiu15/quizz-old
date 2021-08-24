import React from "react";
import { Link } from "react-router-dom";
import "./rules_style.css";

const Rules_page = () => {
  return (
    <div className="info_box">
      <div className="info-title">
        <span>Some Rules of this Quiz</span>
      </div>
      <div className="info-list">
        <span className="info-number">1.</span>
        <div className="info">
          You will have only <span>15 seconds</span> per each question.
        </div>
        <span className="info-number">2.</span>
        <div className="info">
          Once you select your answer, it can't be undone.
        </div>
        <span className="info-number">3.</span>
        <div className="info">
          You can't select any option once time goes off.
        </div>
        <span className="info-number">4.</span>
        <div className="info">
          You can't exit from the Quiz while you're playing.
        </div>
        <span className="info-number">5.</span>
        <div className="info">
          You'll get points on the basis of your correct answers.
        </div>
      </div>
      <div className="buttons">
        <Link to="/" className="quit btn">
          Exit Quiz
        </Link>
        <Link to="/quiz_page" className="restart btn">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Rules_page;
