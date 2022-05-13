import React, { Component } from "react";
import "./App.css";
import {Route, HashRouter} from "react-router-dom";
import voting_creator from "./voting_creator";
import basic_template from "./basic_template";
import all_votings from "./all_votings";
import voting_info from "./voting_info";
let address = '0x8085251775e3fbd891291583886a380323E7E390'
class App extends React.Component {
    render() {
    return (
        <HashRouter>
          <div>
              <Route path="/" component={basic_template} exact />
            <Route exact path="/basic_template" component={basic_template} />
            <Route exact path="/voting_creator" component={voting_creator} />
            <Route exact path="/all_votings" component={all_votings} />
              <Route exact path="/voting_info/:id" component={voting_info} />
          </div>
        </HashRouter>
    );
  }
}

export default App;
