import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./general_style.css";
import Start_page from "./start_page/Start_page";
import Rules_page from "./rules_page/Rules_page";
import Quiz_page from "./quiz_page/Quiz_page";
import Result_page from "./result_page/Result_page";

import { createAPIEndpoint, ENDPOINTS } from "../api";

let questions = [
  {
    numb: 1,
    question: "Which continent has the biggest population?",
    answer: "A",
    options: ["ASIA", "North America", "Europe", "Africa"],
  },
  {
    numb: 2,
    question: "Which scientist developed the theory of relativity?",
    answer: "D",
    options: ["Newton", "Galilei", "Neil Armstrong", "Einstein"],
  },
  {
    numb: 3,
    question: "Which is the highest mountain on Earth?",
    answer: "B",
    options: ["Mount Kilimanjaro", "Mount Everest", "Fujiyama", "Lhots"],
  },
  {
    numb: 4,
    question: "Who was the first person to walk on the moon?",
    answer: "C",
    options: ["John Glenn", "Jim Lowell", "Neil Armstrong", "Alan Shepard"],
  },
  {
    numb: 5,
    question: "How many provinces are there in Turkey?",
    answer: "B",
    options: ["37", "81", "61", "91"],
  },
  {
    numb: 6,
    question: "The modern capital of Turkey is ____ ?",
    answer: "B",
    options: ["Sakarya", "Ankara", "Instanbul", "Tekirdag"],
  },
  {
    numb: 7,
    question: "Uiugag University is in which side of the Republic of Turkey?",
    answer: "A",
    options: ["Bursa", "Instanbul", "Isparta", "Burdur"],
  },
  {
    numb: 8,
    question: "Is Sakarya University a private university?",
    answer: "B",
    options: ["Yes", "No", "Both", "none of the above"],
  },
  {
    numb: 9,
    question: "When was the Republic of Turkey established?",
    answer: "A",
    options: ["1920", "1820", "1960", "same day I was born :)"],
  },
  {
    numb: 10,
    question: "What is the dialing code of the Repubic of Turkey?",
    answer: "B",
    options: ["+44", "+90", "+1", "+97"],
  },
  {
    numb: 11,
    question: "The Republic of Turkey practices which type of Government?",
    answer: "C",
    options: [
      "Federalism",
      "Aristocracy",
      "Provincial National",
      "Monarchical",
    ],
  },
  {
    numb: 12,
    question: "Who is the president of the Republic of Turkey?",
    answer: "A",
    options: [
      "Recep Tayyip Erdogan",
      "Hassan Ipek",
      "Mustafa Tekmen",
      "Erdogan Bektas",
    ],
  },
  {
    numb: 13,
    question: "What currency is used in Turkey?",
    answer: "C",
    options: ["Euro", "Pound sterling", "Lira", "Rand"],
  },
  {
    numb: 14,
    question:
      "Sakarya University was established by the Turkish Law No. 3837 dated _____ ?",
    answer: "C",
    options: ["July 3, 1999", "July 3, 1989", "July 3, 1992", "July 3, 1990"],
  },
  {
    numb: 15,
    question:
      "Turkey is said to be an international commercial centre, which of these is the republic of Turkey known for?",
    answer: "A",
    options: ["Textile", "Ceramics", "Agricultural produce", "Auto-mobile"],
  },
  {
    numb: 16,
    question: "Turkey became a republic in _____ ?",
    answer: "A",
    options: ["1920", "1923", "1930", "1963"],
  },
  {
    numb: 17,
    question: "The European Union is a group of _____ ?",
    answer: "B",
    options: ["24 countries", "27 countries", "18 countries", "41 countries"],
  },
  {
    numb: 18,
    question: "The dominant currency used by the European Union countries is ?",
    answer: "C",
    options: ["Pound", "Lira", "Euro", "USD"],
  },
  {
    numb: 19,
    question:
      "The next presidential and parliamentary elections in Turkey will be held in whay year?",
    answer: "C",
    options: ["2021", "2022", "2023", "2024"],
  },
  {
    numb: 20,
    question: "Sakarya University is located where?",
    answer: "D",
    options: ["Bursa", "Cankiri", "Erzincan", "Adapazari"],
  },
];

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

  export default ComponentIndex;
};

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
