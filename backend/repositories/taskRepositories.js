const taskModel = require("../models/taskModel");


const find = async({user_id}) => {
   const tasks = await taskModel.find({user_id}).sort({createdAt: -1})
   return tasks;
}

const findById = async({user_id}) => {
   const task = await taskModel.findById({user_id})
   return task;
}

const create = async({title, user_id}) => {
   const task = await taskModel.create({title, user_id})
   return task;
}

const findOneAndDelete = async({_id: id}) => {
   const task = await taskModel.findOneAndDelete({_id: id})
   return task;
}

const findOneAndUpdate = async ({ id, ...updateData }) => {
   const task = await taskModel.findOneAndUpdate({ _id: id }, updateData, {
     new: true,
   });
   return task;
 };

exports.taskRepository ={
   find, findById, create,  findOneAndDelete, findOneAndUpdate,
}

