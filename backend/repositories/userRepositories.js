const userModel = require("../models/userModel");

exports.loginUserRepo = async ({ email, password }) => {
  const user = await userModel.login(email, password);
  return user;
};

exports.signupUserRepo = async ({ email, password }) => {
  const user = await userModel.signup(email, password);
  return user;
};
