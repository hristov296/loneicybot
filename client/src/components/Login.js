import React from "react";
import useSignUpForm from "../utils/CustomHooks";

export default function() {
  const signup = () => {
    alert(`User Created!
           Name: ${inputs.username}
           Email: ${inputs.password}`);
  };
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);

  return (
    <div className="container">
      <div className="login-component content">
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input type="text" name="username" onChange={handleInputChange} value={inputs.username} />
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
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
