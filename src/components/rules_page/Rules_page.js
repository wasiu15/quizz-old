import React from "react";
import { Link } from "react-router-dom";
import "./rules_style.css";

const Rules_page = ({ game_type }) => {
  return (
    <div className="info_box">
      <div className="info-title">
        <span>Some Rules of this Quiz</span>
      </div>
      <div className="info-list">
        <span className="info-number">1.</span>
        <div className="info">
          You will have only <span>15 seconds</span> for each question.
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
          {game_type == "Single"
            ? "You can't exit from the Quiz while you're playing."
            : "Click on 'Create Game' to host a game then send the code to your partner"}
        </div>
        <span className="info-number">5.</span>
        <div className="info">
          {game_type == "Single"
            ? "You'll get points on the basis of your correct answers."
            : "Click on 'Join Game' to join a game then enter the code from partner"}
        </div>
      </div>
      <div className="buttons">
        <Link to="/" className="quit btn">
          Exit Quiz
        </Link>
        <Link
          to={game_type == "Single" ? "/quiz_page" : "/m_quiz"}
          className="restart btn"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Rules_page;
