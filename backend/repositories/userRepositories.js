const userModel = require("../models/userModel");


const findOne = async({email}) => {
  const user = await userModel.findOne({email})
  return user;
}

const create = async({email, password: hash}) => {
  const user = await userModel.create({email, password: hash})
  return user;
}


exports.userRepository ={
  findOne, create
}
