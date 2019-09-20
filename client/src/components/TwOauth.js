import { handleLogin } from "../state/actions";

export default props => {
  console.log(props);
  const init = props.authCheck;

  const hash = window.location.hash.substr(1);
  const hashes = hash.split("&").reduce(function(result, item) {
    var parts = item.split("=");
    result[parts[0]] = parts[1];
    return result;
  }, {});

  if (hashes.hasOwnProperty("id_token") && hashes.hasOwnProperty("access_token")) {
    handleLogin({ init, hashes });
  }

  return null;
};
