import React from "react";
import "./rules_style.css";

const Rules_page = () => {
  return (
    <div className="info_box">
      <div className="info-title">
        <span>Some Rules of this Quiz</span>
      </div>
      <div className="info-list">
        <div className="info">
          1. You will have only <span>15 seconds</span> per each question.
        </div>
        <div className="info">
          2. Once you select your answer, it can't be undone.
        </div>
        <div className="info">
          3. You can't select any option once time goes off.
        </div>
        <div className="info">
          4. You can't exit from the Quiz while you're playing.
        </div>
        <div className="info">
          5. You'll get points on the basis of your correct answers.
        </div>
      </div>
      <div className="buttons">
        <button className="quit">Exit Quiz</button>
        <button className="restart">Continue</button>
      </div>
    </div>
  );
};

export default Rules_page;
