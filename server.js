const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const sgMail = require("@sendgrid/mail");

const users = require("./routes/api/users");
const questions = require("./routes/api/questions");
const survey = require("./routes/api/survey");

const SENDGRID_API_KEY = require("./config/keys").sgKey;
sgMail.setApiKey(SENDGRID_API_KEY);

const loadQuestions = require("./config/questions");

loadQuestions.populateQuestions();

const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));

const db = require("./config/keys").mongoURI;

mongoose
  .set("useFindAndModify", false)
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
// app.use("/api/questions", questions);
app.use("/api/survey", survey);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} in ${process.env.NODE_ENV}`));
