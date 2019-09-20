const jwt = require("jsonwebtoken");
const keys = require("../config/keys");


module.exports = signToken = payload => {
  // Sign token
  return new Promise((resolve,reject) => {
    jwt.sign(payload, keys.secretOrKey,{
        expiresIn: 31556926 // 1 year in seconds
      },
      (err, token) => {
        if (err) reject(err);

        resolve({
          success: true,
          token: "Bearer " + token
        })
      }
    );
  })  
}