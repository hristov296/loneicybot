import React, { useState } from "react";
import UserContext from "../state/UserStore";
import { Link } from "react-router-dom";
import { ReactComponent as Twlogo } from "../assets/svg/tw-logo.svg";
import { ReactComponent as Preloader } from "../assets/svg/preloader.svg";

export default function() {
  const [imgLoaded, loading] = useState(0);

  return (
    <UserContext.Consumer>
      {user => (
        <header className="header">
          <div className="container">
            <>
              {user.isAuthenticated ? (
                user.user.displayName && user.user.picture ? (
                  <p>
                    <img
                      onLoad={() => loading(1)}
                      src={user.user.picture}
                      width="50"
                      height="50"
                      alt="profile-pic"
                    />
                    <span>{user.user.displayName}</span>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        user.handleLogoutUser();
                      }}>
                      Logout
                    </button>
                  </p>
                ) : (
                  <p>
                    You are logged in as
                    <span> {user.user.username}. </span>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        user.handleLogoutUser();
                      }}>
                      Logout
                    </button>
                  </p>
                )
              ) : (
                <>
                  {/* <div className="login-actions">
                  <p>
                    <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
                  </p>
                </div> */}
                  <div className="login-tw-button">
                    <Link to="/tw-login" className="button-link">
                      <Twlogo className="icon" />
                      <span>Login with Twitch</span>
                    </Link>
                    <span className="input-errors">{user.errors.twlogin}</span>
                  </div>
                </>
              )}
              <div className="preload-hide">
                {user.loadingLoginCreds && !imgLoaded ? <Preloader /> : ""}
              </div>
            </>
          </div>
        </header>
      )}
    </UserContext.Consumer>
  );
}
