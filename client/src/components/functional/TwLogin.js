export default () => {
  const redirect_uri = "http://irithyll.com/twitch-oauth";
  const uri_encoded = encodeURIComponent(redirect_uri);
  const twLoginLink = `https://id.twitch.tv/oauth2/authorize?client_id=s9cm3xf00umuna6en3xp3c0guhvq09&redirect_uri=${uri_encoded}&response_type=token&scope=openid`;

  window.location.href = twLoginLink;

  return null;
};
