import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./general_style.css";
import Start_page from "./start_page/Start_page";
import Rules_page from "./rules_page/Rules_page";
import Quiz_page from "./quiz_page/Quiz_page";
import Result_page from "./result_page/Result_page";

import { createAPIEndpoint, ENDPOINTS, GET_QUESTIONS } from "../api";
import Game_type from "./game_type/Game_type";
import Multi_index from "./m_quiz/";

let questionsList = GET_QUESTIONS.questions;

const ComponentIndex = () => {
  var questions = [];
  var questionsTotal = questionsList.sort(() => (Math.random() > 0.5 ? 1 : -1)); // get random
  let counter = 0;
  questionsTotal.forEach((question) => {
    if (counter < 10) {
      questions.push(question);
    }
    counter++;
  });
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Game_type />
        </Route>
        <Route path="/rules_page">
          <Rules_page />
        </Route>
        <Route path="/quiz_page">
          <Quiz_page questions={questions} />
        </Route>
        <Route path="/m_quiz">
          <Multi_index allQuestions={questionsTotal} />
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
