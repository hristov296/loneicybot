import React from "react";
import "./assets/styles/style.sass";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Main from "./components/Main";

import UserContext, { UserStore } from "./state/UserStore";

class App extends React.Component {
  render() {
    return (
      <UserStore>
        <div className="App">
          <Router>
            <Header />
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Router>
        </div>
      </UserStore>
    );
  }
}

export default App;
