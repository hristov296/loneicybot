const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const crypto = require("crypto");
const request = require("request");
const signToken = require("../../utils/index");

const Nonce = require("../../models/Nonce");
const User = require("../../models/User");

const redirect_uri = "http://localhost:3000/";
const uri_encoded = encodeURIComponent(redirect_uri);

router.get("/login", (req, res) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  const claims = JSON.stringify({
    id_token: { email: null, email_verified: null, preferred_username: null },
    userinfo: { picture: null },
  });
  const twLoginLink = `https://id.twitch.tv/oauth2/authorize?client_id=${
    process.env.TW_CLIENTID
  }&redirect_uri=${uri_encoded}&response_type=token+id_token&scope=openid&nonce=${encodeURIComponent(
    nonce
  )}&claims=${claims}`;

  const newNonce = new Nonce({
    nonce: nonce,
  });
  newNonce
    .save()
    .then(() => {
      res.redirect(twLoginLink);
    })
    .catch(err => {
      throw err;
    });
});

router.get("/oauth", (req, res) => {
  if (req.query.code) {
    const postUri = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TW_CLIENTID}&client_secret=${process.env.TW_SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=${uri_encoded}`;
    request.post(postUri, {}, (err, response, body) => {
      if (err) throw err;

      const jsonResponse = JSON.parse(body);

      Nonce.findOneAndDelete({ nonce: jsonResponse.nonce }).then(nonce => {
        if (!nonce) {
          return res.status(400).send("Invalid or expired nonce!");
        }

        const token = jwt_decode(jsonResponse.id_token);
        const currentTime = Date.now() / 1000;
        console.log(token);

        if (token.iss !== "https://id.twitch.tv/oauth2" || token.aud !== process.env.TW_CLIENTID) {
          res.status(400).send("Invalid token audience or issuer");
        }
        if (currentTime < token.exp) {
          res.status(400).send("Expired token!");
        }
      });
      console.log(jsonResponse);
    });
  }
  // console.log(req);

  res.sendStatus(200);
});

router.post("/handlelogin", (req, res) => {
  // console.log(req.body);
  if (!req.body.hashes) {
    return res.status(400).json({ twlogin: "Invalid tokens" });
  }

  const id_token = jwt_decode(req.body.hashes.id_token);
  const access_token = req.body.hashes.access_token;
  const user = req.body.init;
  const currentTime = Date.now() / 1000;

  Nonce.findOneAndDelete({ nonce: id_token.nonce })
    .then(nonce => {
      if (!nonce) {
        throw new Error("Invalid or expired nonce!");
      }

      if (id_token.iss !== "https://id.twitch.tv/oauth2" || id_token.aud !== process.env.TW_CLIENTID) {
        throw new Error("Invalid token audience or issuer");
      }
      if (currentTime > id_token.exp) {
        throw new Error("Expired token!");
      }
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        request(
          {
            url: "https://id.twitch.tv/oauth2/userinfo",
            headers: {
              Authorization: "Bearer " + access_token,
            },
          },
          (err, response, body) => {
            if (err) reject(err);
            const jsonResponse = JSON.parse(body);
            resolve(jsonResponse);
          }
        );
      });
    })
    .then(jsonResponse => {
      id_token.picture = jsonResponse.picture;

      if (user.isAuthenticated) {
        User.findOneAndUpdate(
          { _id: user.user.id },
          {
            twid: id_token.twid,
            displayName: id_token.displayName,
            email: id_token.email,
            picture: id_token.picture,
          },
          { runValidators: true, setDefaultsOnInsert: true }
        )
          .then(doc => {
            console.log(doc);
            const payload = {
              id: doc._id,
              username: doc.username,
              displayName: doc.displayName,
              twid: doc.twid,
              picture: doc.picture,
            };

            signToken(payload)
              .then(token => res.json(token))
              .catch(err => console.log(err));
          })
          .catch(err => {
            throw new Error(err);
          });
      } else {
        User.findOne({ twid: id_token.sub })
          .then(user => {
            if (user) {
              const payload = {
                id: user._id,
                displayName: user.displayName,
                twid: user.twid,
                picture: user.picture,
              };
              signToken(payload)
                .then(token => res.json(token))
                .catch(err => console.log(err));
            } else {
              const newUser = new User({
                displayName: id_token.preferred_username,
                twid: id_token.sub,
                email: id_token.email,
                picture: id_token.picture,
              });

              newUser
                .save()
                .then(() => {
                  const payload = {
                    id: newUser._id,
                    displayName: newUser.displayName,
                    twid: newUser.twid,
                    picture: newUser.picture,
                  };
                  signToken(payload)
                    .then(token => res.json(token))
                    .catch(err => console.log(err));
                })
                .catch(err => {
                  throw new Error(err);
                });
            }
          })
          .catch(err => {
            throw new Error(err);
          });
      }
    })
    .catch(err => {
      return res.status(400).json({ twlogin: err.message });
    });

  // return res.sendStatus(200);
});

module.exports = router;
