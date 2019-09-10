import React, { useState } from "react";
import UserContext from "../state/UserStore";

export default function() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    repassword: "",
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
                  user.handleRegisterUser(inputs);
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
                </div>
                <div>
                  <label htmlFor="password" className="form-label">
                    Confirm password:
                  </label>
                  <input
                    type="password"
                    name="repassword"
                    onChange={handleInputChange}
                    value={inputs.repassword}
                  />
                </div>
                <div>
                  <input type="submit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}
