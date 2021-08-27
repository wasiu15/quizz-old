import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./general_style.css";
import Start_page from "./start_page/Start_page";
import Rules_page from "./rules_page/Rules_page";
import Quiz_page from "./quiz_page/Quiz_page";
import Result_page from "./result_page/Result_page";

import { createAPIEndpoint, ENDPOINTS, GET_QUESTIONS } from "../api";

let questionsList = GET_QUESTIONS.questions;

const ComponentIndex = () => {
  var questions = [];
  let _questions = questionsList.sort(() => (Math.random() > 0.5 ? 1 : -1)); // get random
  let counter = 0;
  _questions.forEach((question) => {
    if (counter < 20) {
      questions.push(question);
    }
    counter++;
  });
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

//   const [questions, setQuestions] = useState([]);
//   let counter = 1;
//   useEffect(() => {
//     createAPIEndpoint(ENDPOINTS.QUESTION)
//       .fetchAll()
//       .then((res) => {
//         let questionList = res.data.map((item) => ({
//           question: item.question_,
//           options: [item.optionA_, item.optionB_, item.optionC_, item.optionD_],
//           answer: item.answer_,
//         }));
//         let tempSorter = questionList.sort(() =>
//           Math.random() > 0.5 ? 1 : -1
//         );
//         setQuestions(tempSorter);
//       });
//   }, []);
//   console.log(questions);
