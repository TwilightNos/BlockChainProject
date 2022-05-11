import React, { Component } from "react";
import "./App.css";
import {Route, HashRouter} from "react-router-dom";
import voting_creator from "./voting_creator";
import home from "./home";
import all_votings from "./all_votings";
import voting_info from "./voting_info";
import mine_voting from "./mine_voting";
import mine_voting_info from "./mine_voting_info";
import attend_voting from "./attend_voting";
import attend_voting_info from "./attend_voting_info";
class App extends React.Component {
    render() {
    return (
        <HashRouter>
          <div>
              <Route path="/" component={home} exact />
            <Route exact path="/home" component={home} />
            <Route exact path="/voting_creator" component={voting_creator} />
            <Route exact path="/all_votings" component={all_votings} />
              <Route exact path="/voting_info/:id" component={voting_info} />
            <Route exact path="/mine_voting" component={mine_voting} />
              <Route exact path="/mine_voting_info/:id" component={mine_voting_info} />
              <Route exact path="/attend_voting" component={attend_voting} />
              <Route exact path="/attend_voting_info/:id" component={attend_voting_info} />
          </div>
        </HashRouter>
    );
  }
}

export default App;
