import React from "react";
import { Link } from "react-router-dom";
import "./start_style.css";

const Start_page = () => {
  return (
    <div className="full">
      <div className="start_btn">
        <Link className="start_link" to="/rules_page">
          Start Quiz
        </Link>
      </div>
      <p className="designedBy">Designed by: Alfred</p>
    </div>
  );
};

export default Start_page;
