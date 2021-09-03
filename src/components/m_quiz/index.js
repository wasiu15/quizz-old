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
  const [isNotfication, setIsNotfication] = useState(false);
  const [isFade, setIsFade] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(false);
  const [isGenNotification, setIsGenNotification] = useState(false);
  var isWaiting = false;
  var connectionStatus = "";
  const [bookingCode, setBookingCode] = useState("");

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
  }
  function sendMessage() {
    //Send message on socket
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
            setHomeName(payload.homeName);
            setAwayName(payload.awayName);
            if (isWaiting) {
              setIsGameTime(true);
              setPlayer("home");
            } else {
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
          <div className={isFade ? "notification fade-out" : "hidden"}>
            Please, enter your nickname
          </div>
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
          <p className="designedBy">Designed by: Alfred</p>
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
          <div className={isNotfication ? "notification fade-out" : "hidden"}>
            {isGenNotification
              ? notificationMessage
              : isLoading
              ? "waiting for your partner to connect"
              : isCreate
              ? "Send the code bolow to your partner"
              : "Paste the code from partner below"}
          </div>
          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            ""
          )}
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
        </div>
      )}
    </div>
  );
  function getNameHandler() {
    if (playerName !== "") {
      getBookingCode();
      setGetName(false);
      setIsGameTime(false);
      setIsNotfication(true);
    } else {
      setIsFade(true);
    }
    resetFader();
  }
  function skipHandler() {
    getBookingCode();
    setIsGameTime(false);
    setGetName(false);
    setIsNotfication(true);
    resetFader();
  }
  function changePage() {
    isCreate ? setBookingCode("") : setBookingCode(bookingCodeFromServer);
    setIsCreate(!isCreate);
    setIsNotfication(true);
    resetFader();
  }
  function resetFader() {
    setTimeout(() => {
      setIsNotfication(false);
      setIsFade(false);
      setIsLoading(false);
    }, 9000);
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
    isCallFromButtonCreate = true;
    sendMessage();
    setIsLoading(true);
    setIsNotfication(true);
    setNotificationMessage(
      "Send the booking code to your partner to Join Game"
    );
    setIsGenNotification(true);
    notificationLooper();
  }

  function notificationLooper() {
    setTimeout(() => {
      setIsGenNotification(true);
    }, 9000);
    setTimeout(() => {
      setIsGenNotification(false);
    }, 1000);
  }

  function joinHandler() {
    connectionStatus = "want to pair";
    isCallFromBottunJoin = true;
    sendMessage();
    setIsNotfication(true);
  }

  function sendQuestionsForJoin(_concatQuestionNumber) {
    var tempArray = _concatQuestionNumber.split(" , ");
    tempArray.forEach((selectedNumber) => {
      allQuestions.forEach((elementAll) => {
        if (elementAll.numb == selectedNumber) {
          questionTen.push(elementAll);
        }
      });
    });
    isCallFromBottunJoin = false;
    setIsGameTime(true);
    setPlayer("away");
  }

  function unableToConnect() {
    isCallFromBottunJoin = false;
  }
};

export default Multi_index;
