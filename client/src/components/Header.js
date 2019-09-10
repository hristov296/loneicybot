import React from "react";
import UserContext from "../state/UserStore";
import { Link } from "react-router-dom";

export default function() {
  return (
    <UserContext.Consumer>
      {user => (
        <header className="header">
          <div className="container">
            {user.isAuthenticated ? (
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
            ) : (
              <p>
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
              </p>
            )}
          </div>
        </header>
      )}
    </UserContext.Consumer>
  );
}
