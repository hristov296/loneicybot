const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  // data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.repassword = !isEmpty(data.repassword) ? data.repassword : "";

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // Email checks
  // if (Validator.isEmpty(data.email)) {
  //   errors.email = "Email field is required";
  // } else if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.repassword)) {
    errors.repassword = "Confirm password field is required";
  }

  if (!Validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username must be at least 3 characters and not more than 20";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters and not more than 30";
  }

  if (!Validator.equals(data.password, data.repassword)) {
    errors.repassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
