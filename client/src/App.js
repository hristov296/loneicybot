import React from "react";
import "./assets/styles/style.sass";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Main from "./components/Main";
import TwOauth from "./components/TwOauth";

import { UserStore } from "./state/UserStore";

class App extends React.Component {
  render() {
    return (
      <UserStore authCheck={this.props.authCheck} hashesIn={this.props.hashesIn}>
        <div className="App">
          <Router>
            <Header />
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/tw-login"
              render={() => {
                window.location.href = "http://localhost:5000/api/twitch/login";
                return null;
              }}
            />
            <Route path="/tw-oauth" render={() => <TwOauth authCheck={this.props.authCheck} />} />
          </Router>
        </div>
      </UserStore>
    );
  }
}

export default App;
