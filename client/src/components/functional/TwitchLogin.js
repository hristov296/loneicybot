import React from "react";
import { ReactComponent as Twlogo } from "../../assets/svg/tw-logo.svg";
import { Link } from "react-router-dom";
import { loginWithTwitch } from "../../state/actions";

export default () => {
  return (
    <Link to="/tw-login" className="button-link">
      <Twlogo className="icon" />
      <span>Login with Twitch</span>
    </Link>
  );
};
