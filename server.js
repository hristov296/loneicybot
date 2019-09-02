const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require('./routes/api/users');

const app = express();

// app.use(express.static(path.join(__dirname, '/client/build')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname,'/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} in ${process.env.NODE_ENV}`));