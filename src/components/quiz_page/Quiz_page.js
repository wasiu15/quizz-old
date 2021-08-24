import React from "react";
import "./quiz_style.css";

const Quiz_page = () => {
  return (
    <div className="quiz_box">
      <header>
        <div className="title">Awesome Quiz Application</div>
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
        <button className="next_btn">Next Que</button>
      </footer>
    </div>
  );
};

export default Quiz_page;
