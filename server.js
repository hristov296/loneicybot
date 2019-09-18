require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const crypto = require("crypto");
const request = require("request");

const users = require("./routes/api/users");
const bot = require("./routes/api/bot");

const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));

const db = process.env.MONGO_URI;

mongoose
  .set("useFindAndModify", false)
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/bot", bot);

app.get("/tw-login", (req, res) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  const redirect_uri = "http://localhost:5000/tw-oauth";
  const uri_encoded = encodeURIComponent(redirect_uri);
  const claims = JSON.stringify({
    id_token: { email: null, email_verified: null, preferred_username: null },
    userinfo: { picture: null },
  });
  const twLoginLink = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TW_CLIENTID}&redirect_uri=${uri_encoded}&response_type=code&scope=openid&nonce=${nonce}&claims=${claims}`;

  res.redirect(twLoginLink);
});

app.get("/tw-oauth", (req, res) => {
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} in ${process.env.NODE_ENV}`));
