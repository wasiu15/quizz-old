import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./general_style.css";
import Start_page from "./start_page/Start_page";
import Rules_page from "./rules_page/Rules_page";
import Quiz_page from "./quiz_page/Quiz_page";
import Result_page from "./result_page/Result_page";

const index = () => {
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
          <Quiz_page />
        </Route>
        <Route path="/result_page">
          <Result_page />
        </Route>
      </Switch>
    </Router>
  );
};

export default index;
