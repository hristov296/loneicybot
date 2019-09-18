import React from "react";
import "./assets/styles/style.sass";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { randomBytes } from "crypto";

import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Main from "./components/Main";
import TwOauth from "./components/TwOauth";

import { UserStore } from "./state/UserStore";

class App extends React.Component {
  render() {
    return (
      <UserStore authCheck={this.props.authCheck}>
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
                window.location.href = "http://localhost:5000/api/twitch/tw-login";
                return null;
                const nonce = encodeURIComponent(randomBytes(16).toString("base64"));
                localStorage.setItem("currentNonce", nonce);
                const redirect_uri =
                  process.env.NODE_ENV === "development"
                    ? `http://localhost:5000/tw-oauth`
                    : "http://irithyll.com/tw-oauth";
                const uri_encoded = encodeURIComponent(redirect_uri);
                const claims = JSON.stringify({
                  id_token: { email: null, email_verified: null, preferred_username: null },
                  userinfo: { picture: null },
                });
                const twLoginLink = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TW_CLIENTID}&redirect_uri=${uri_encoded}&response_type=code&scope=openid&nonce=${nonce}&claims=${claims}`;
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
