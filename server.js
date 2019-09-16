require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const crypto = require("crypto");

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
  const twLoginLink = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TW_CLIENTID}&redirect_uri=${uri_encoded}&response_type=token&scope=openid&nonce=${nonce}`;

  res.redirect(twLoginLink);
});
app.get("/tw-oauth", (req, res) => {
  console.log(req);
  res.sendStatus(200);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} in ${process.env.NODE_ENV}`));
