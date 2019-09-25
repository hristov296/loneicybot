const express = require("express");
const router = express.Router();
const bot = require("../../bot");

router.post("/startbot", (req, res) => {
  bot
    .startBot()
    .then(nice => {
      console.log(nice);
      res.send(nice);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

router.post("/stopbot", (req, res) => {
  bot
    .stopBot()
    .then(nice => {
      console.log(nice);
      res.send(nice);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = router;
