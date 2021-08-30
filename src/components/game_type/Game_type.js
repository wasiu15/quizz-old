import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rules_page from "../rules_page/Rules_page";

const Game_type = () => {
  const [selectedType, setSelectedType] = useState("");
  return (
    <div className="game_type">
      {selectedType !== "" ? (
        <Rules_page game_type={selectedType} />
      ) : (
        <div className="full">
          <div className="start_btn">
            <button
              className="start_link"
              onClick={() => onClickHandler("Single")}
            >
              Single Player
            </button>
            <br />
            <button
              className="start_link"
              onClick={() => onClickHandler("Multi")}
            >
              Multi PLayer
            </button>
          </div>
          <p className="designedBy">Designed by: Alfred</p>
        </div>
      )}
    </div>
  );
  function onClickHandler(input) {
    setSelectedType(input);
  }
};

export default Game_type;
