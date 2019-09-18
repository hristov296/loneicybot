import jwt_decode from "jwt-decode";
import { updateUserProfile } from "../state/actions";

export default props => {
  console.log(props);
  const init = props.authCheck;

  const twoauth = "https://id.twitch.tv/oauth2";

  const hash = window.location.hash.substr(1);
  const hashes = hash.split("&").reduce(function(result, item) {
    var parts = item.split("=");
    result[parts[0]] = parts[1];
    return result;
  }, {});

  const currentTime = Date.now() / 1000;
  if (hashes.hasOwnProperty("id_token")) {
    const id_token = hashes.id_token;
    const decoded = jwt_decode(id_token);
    const currentNonce = localStorage.getItem("currentNonce");
    console.log(decoded);

    if (
      decoded.nonce === decodeURIComponent(currentNonce) &&
      decoded.aud === process.env.REACT_APP_TW_CLIENTID &&
      decoded.exp > currentTime &&
      decoded.iss === twoauth
    ) {
      if (init.isAuthenticated) {
        init.user.twid = decoded.sub;
        init.user.displayName = decoded.preferred_username;
        init.user.email = decoded.email;
        // updateUserProfile(init.user);
      }
    }
  }

  return null;
};
