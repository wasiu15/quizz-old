import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import M_quiz from "./M_quiz";
import "./style.css";

const bookingCodes = ["LSF23", "COUA2", "SLDF2", "IWYW6"];
const Multi_index = ({ allQuestions }) => {
  //  const [questionNumbers, setQuestionNumbers] = useState("");
  const [questionTen, setquestionTen] = useState([]);
  //const questionTen = [];
  var booking_code = "";
  const [concatQuestionNumber, setConcatQuestionNumber] = useState("");
  const [isGameTime, setIsGameTime] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [player, setPlayer] = useState("");
  const [bookingCode, setBookingCode] = useState("LSDF24");
  var tempBooking = bookingCodes[parseInt(Math.random() * 4)];

  const [connectionStatus, setConnectionStatus] = useState("")
  const [bookingCodeFromserver, setBookingCodeFromserver] = useState("")

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  
  const socket = io("http://localhost:7000");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (payload) => {
      if(payload.connectionStatus == "waiting for pair" && payload.bookingCode == bookingCode){      
      setBookingCodeFromserver(payload.bookingCode)
      concatQuestionNumber = payload.concatQuestionNumber;
      }
    });
  });

  const sendMessage = () => {
    console.log(message);
    if(connectionStatus == "waiting for pair"){
      socket.emit("message", { bookingCode, connectionStatus, concatQuestionNumber });
      //Send message on socket
    } else {
      socket.emit("message", { bookingCode, connectionStatus });
    }
  };


  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  return (
    <div className="multi_container">
      {isGameTime ? (
        <M_quiz
          questions={questionTen}
          player={player}
          bookingCode={bookingCode}
        />
      ) : (
        <div className="full">
          {isCreate ? (
            <div className="join-grp-div start_btn">
              <button onClick={goto}>go to join</button>
              <h2>Booking Code:</h2>
              <input type="text" readOnly value={bookingCode} />
              <button class="btn" onClick={createHandler}>
                Create Now
              </button>
            </div>
          ) : (
            <div className="join-grp-div start_btn">
              <h2>Booking Code:</h2>
              <input
                type="text"
                id="join_booking_input"
                onChange={(e) => {
                  setBookingCode(e.target.value);
                }}
                placeholder="LSDF24"
              />
              <button class="btn" onClick={joinHandler}>
                Join Now
              </button>
            </div>
          )}
          <p className="designedBy">Designed by: Alfred</p>
        </div>
      )}
    </div>
  );
  function goto() {
    setIsCreate(false);
  }
  function createHandler() {
    setConnectionStatus("waiting for pair")
    //save booking and question numbs to database
    // display waiting for player 2
    // after 2mins display delay from player 2
    let counter = 0;
    allQuestions.forEach((question) => {
      if (counter < 10) {
        setquestionTen((questionTen) => [...questionTen, question]);
        setConcatQuestionNumber(concatQuestionNumber + " , " + question.numb);
      }
      counter++;
    });
    //setQuestionNumbers(questionTen);
    //send booking_code
    setBookingCode(tempBooking);
    setPlayer("home");
    setIsGameTime(true);
    //setIsCreate(false);
  }
  function joinHandler() {
    setConnectionStatus("want to pair")
    // get booking and question numbs from database
    // join right away
    // get booking_code
    // send joined add it to booking_code
    setquestionTen([]);
    let counter = 0;
    allQuestions.forEach((question) => {
      if (counter < 10) {
        setquestionTen((questionTen) => [...questionTen, question]);
        setConcatQuestionNumber(concatQuestionNumber + " , " + question.numb);
      }
      counter++;
    });
    //var entered_booking = document.getElementById("join_booking_input").value;

    if (bookingCode == bookingCodeFromserver) {    
      var tempArray = concatQuestionNumber.split(" , ");

      allQuestions.forEach((elementAll) => {
        tempArray.forEach((selectedNumber) => {
          if (elementAll.numb == selectedNumber) {
            questionTen.push(elementAll);
          }
        });
      });
      //console.log(questionTen);
    } else{
      console.log("booking code error")
    }
    setPlayer("away");
    setIsGameTime(true);
    //setIsCreate(true);
  }
};

export default Multi_index;
