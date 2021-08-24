import React from "react";
import { Link } from "react-router-dom";
import "./quiz_style.css";

const Quiz_page = () => {
  return (
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
        <div className="que_text"></div>
        <div className="option_list"></div>
      </section>

      <footer>
        <div className="total_que"></div>
        <Link className="next_btn btn">Next Que</Link>
      </footer>
    </div>
  );
};

export default Quiz_page;
