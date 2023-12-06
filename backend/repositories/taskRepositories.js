const taskModel = require("../models/taskModel");


exports.getTasksRepo = async({user_id}) => {
     const tasks = await taskModel.find({user_id}).sort({createdAt: -1})
     return tasks;
  }




exports.getTaskRepo = async({user_id}) => {
    const task = await taskModel.findById({user_id})
    return task;
 }


exports.createTaskRepo = async({title, user_id}) => {
    const task = await taskModel.create({title, user_id})
    return task;
 }


exports.deleteTaskRepo = async({_id: id}) => {
    const task = await taskModel.findOneAndDelete({_id: id})
    return task;
 }



exports.updateTaskRepo = async ({ id, ...updateData }) => {
   const task = await taskModel.findOneAndUpdate({ _id: id }, updateData, {
     new: true,
   });
   return task;
 };
 //{ new: true }: This option ensures that the method returns the updated document rather than the original one.