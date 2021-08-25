import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./general_style.css";
import Start_page from "./start_page/Start_page";
import Rules_page from "./rules_page/Rules_page";
import Quiz_page from "./quiz_page/Quiz_page";
import Result_page from "./result_page/Result_page";

let questions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "B",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "D",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "A",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "D",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "A",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language",
    ],
  },
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....

  //   {
  //   numb: 6,
  //   question: "Your Question is Here",
  //   answer: "Correct answer of the question is here",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },
];
var time,
  question,
  options = [],
  marker,
  numbOfQuests = [];
const ComponentIndex = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Start_page />
        </Route>
        <Route path="/rules_page">
          <Rules_page />
        </Route>
        <Route path="/quiz_page">
          <Quiz_page questions={questions} />
        </Route>
        <Route path="/result_page">
          <Result_page />
        </Route>
      </Switch>
    </Router>
  );
};

export default ComponentIndex;
