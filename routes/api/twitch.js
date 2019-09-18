const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const request = require("request");

router.get("/tw-login", (req, res) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  const redirect_uri = "http://localhost:5000/api/twitch/tw-oauth";
  const uri_encoded = encodeURIComponent(redirect_uri);
  const claims = JSON.stringify({
    id_token: { email: null, email_verified: null, preferred_username: null },
    userinfo: { picture: null },
  });
  const twLoginLink = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TW_CLIENTID}&redirect_uri=${uri_encoded}&response_type=code&scope=openid&nonce=${nonce}&claims=${claims}`;

  res.redirect(twLoginLink);
});

router.get("/tw-oauth", (req, res) => {
  if (req.query.code) {
    const postUri = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TW_CLIENTID}&client_secret=${process.env.TW_SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http://localhost:5000/tw-oauth`;
    request.post(postUri, {}, (err, response, body) => {
      if (err) throw err;

      console.log(JSON.parse(body));
    });
  }
  // console.log(req);

  res.sendStatus(200);
});

module.exports = router;
