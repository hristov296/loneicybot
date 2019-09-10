import React, { useState } from "react";
import UserContext from "../state/UserStore";

export default function() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  return (
    <UserContext.Consumer>
      {user => {
        return (
          <div className="container">
            <div className="login-component content">
              <form
                noValidate
                onSubmit={e => {
                  e.preventDefault();
                  user.handleLoginUser(inputs);
                }}>
                <div>
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    value={inputs.username}
                  />
                  <span className="input-errors">{user.errors.username}</span>
                </div>
                <div>
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={inputs.password}
                  />
                  <span className="input-errors">{user.errors.password}</span>
                </div>
                <div>
                  <input type="submit" value="Login" />
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}
