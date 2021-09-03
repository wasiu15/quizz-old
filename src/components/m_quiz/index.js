import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import M_quiz from "./M_quiz";
import "./style.css";

var questionTen = [];
var isGetBooking = true;
var stage = "1";
var bookingCodeFromServer = "";
const Multi_index = ({ allQuestions }) => {
  var concatQuestionNumber = "";
  const [isGameTime, setIsGameTime] = useState(true);
  const [isCreate, setIsCreate] = useState(true);
  const [player, setPlayer] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [getName, setGetName] = useState(true);
  const [homeName, setHomeName] = useState("");
  const [awayName, setAwayName] = useState("");
  var isWaiting = false;
  var connectionStatus = "";
  const [bookingCode, setBookingCode] = useState("");
  //const [bookCodes, setBookCodes] = useState([])

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  var isCallFromButtonCreate = false,
    isCallFromBottunJoin = false;
  const socket = io("http://localhost:7000");
  function getBookingCode() {
    socket.emit("message", {
      stage,
      isGetBooking,
    });
    //isGetBooking = false;
  }
  function sendMessage() {
    //Send message on socket
    console.log(player);
    if (isCallFromButtonCreate && connectionStatus == "waiting for pair") {
      socket.emit("message", {
        stage,
        bookingCode,
        connectionStatus,
        concatQuestionNumber,
        player,
        playerName,
      });

      isWaiting = true;
      isCallFromButtonCreate = false;
    }
    if (isCallFromBottunJoin && connectionStatus == "want to pair") {
      socket.emit("message", {
        stage,
        playerName,
        bookingCode,
        connectionStatus,
      });
    }
  }

  useEffect(() => {
    socket.on("message", (payload) => {
      console.log("recieved data from server");
      if (isGetBooking) {
        setBookingCode(payload);
        bookingCodeFromServer = payload;
        isGetBooking = false;
      } else {
        if (isCallFromBottunJoin || isWaiting) {
          if (
            payload.connectionStatus == "paired" &&
            payload.bookingCode == bookingCode
          ) {
            console.log("I'm here :)");
            setHomeName(payload.homeName);
            setAwayName(payload.awayName);
            if (isWaiting) {
              // setHomeName(payload.homeName);
              // setAwayName(payload.awayName);
              setIsGameTime(true);
              setPlayer("home");
            } else {
              // setHomeName(payload.homeName);
              // setAwayName(payload.awayName);
              concatQuestionNumber = payload.concatQuestionNumber;
              sendQuestionsForJoin(concatQuestionNumber);
            }
          } else {
            unableToConnect(payload);
          }
        }
      }
    });
  });

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  return (
    <div className="multi_container">
      {getName ? (
        <div className="full">
          <div className="join-grp-container">
            <div className="join-grp-div">
              <h2>Welcome</h2>
              <input
                onChange={(e) => setPlayerName(e.target.value)}
                type="text"
                maxLength="8"
                placeholder="nickname..."
              />
              <button class="btn" onClick={getNameHandler}>
                Continue
              </button>
            </div>
            <button className="btnJoin" onClick={skipHandler}>
              Skip
            </button>
          </div>
        </div>
      ) : isGameTime ? (
        <M_quiz
          questions={questionTen}
          player={player}
          playerName={playerName}
          homeName={homeName}
          awayName={awayName}
          bookingCode={bookingCode}
        />
      ) : (
        <div className="full">
          {isCreate ? (
            <div className="join-grp-container">
              <div className="join-grp-div">
                <h2>Booking Code</h2>
                <input type="text" value={bookingCode} readOnly />
                <button class="btn" onClick={createHandler}>
                  Create Game
                </button>
              </div>
              <button className="btnJoin" onClick={changePage}>
                Join Game
              </button>
            </div>
          ) : (
            <div className="join-grp-container">
              <div className="join-grp-div">
                <h2>Booking Code</h2>
                <input
                  value={bookingCode}
                  onChange={(e) => {
                    setBookingCode(e.target.value);
                  }}
                  placeholder="LSDF24"
                />
                <button class="btn" onClick={joinHandler}>
                  Join Now
                </button>
              </div>
              <button className="btnJoin" onClick={changePage}>
                Create Game
              </button>
            </div>
          )}
          <p className="designedBy">Designed by: Alfred</p>
        </div>
      )}
      <p className="designedBy">Designed by: Alfred</p>
    </div>
  );
  function getNameHandler() {
    if (playerName !== "") {
      getBookingCode();
      setGetName(false);
      setIsGameTime(false);
    } else {
      alert("Please, enter a nickname");
    }
  }
  function skipHandler() {
    getBookingCode();
    setIsGameTime(false);
    setGetName(false);
  }
  function changePage() {
    isCreate ? setBookingCode("") : setBookingCode(bookingCodeFromServer);
    setIsCreate(!isCreate);
  }
  function createHandler() {
    connectionStatus = "waiting for pair";
    let counter = 0;
    questionTen = [];
    concatQuestionNumber = " , ";
    allQuestions.forEach((question) => {
      if (counter < 2) {
        questionTen.push(question);
        concatQuestionNumber = concatQuestionNumber + " , " + question.numb;
      }
      counter++;
    });
    console.log(questionTen);
    //setIsGameTime(true);
    isCallFromButtonCreate = true;
    sendMessage();
  }
  function joinHandler() {
    connectionStatus = "want to pair";
    isCallFromBottunJoin = true;
    sendMessage();

    //setIsCreate(true);
  }

  function sendQuestionsForJoin(_concatQuestionNumber) {
    console.log("Send Question For Join involked");
    var tempArray = _concatQuestionNumber.split(" , ");
    tempArray.forEach((selectedNumber) => {
      allQuestions.forEach((elementAll) => {
        if (elementAll.numb == selectedNumber) {
          questionTen.push(elementAll);
        }
      });
    });
    console.log(questionTen);
    isCallFromBottunJoin = false;
    console.log("set join to true", questionTen);
    setIsGameTime(true);
    //if (player == "") {
    setPlayer("away");
    //}
  }

  function unableToConnect(sendOutBookingObj) {
    console.log(sendOutBookingObj);
    isCallFromBottunJoin = false;
  }
};

export default Multi_index;
