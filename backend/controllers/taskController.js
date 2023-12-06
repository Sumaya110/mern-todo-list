// const Task = require('../models/taskModel')
const mongoose = require('mongoose')
const { getTasksRepo, getTaskRepo, deleteTaskRepo, createTaskRepo, updateTaskRepo } = require('../repositories/taskRepositories')

// GET all tasks
const getTasks = async(req, res) => {
   const user_id =req.user._id
   const tasks = await getTasksRepo({user_id});
   res.status(200).json(tasks)
}

// GET a single task
const getTask = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such task'})
    }
  
    // const task = await Task.findById(id)
    const task = await getTaskRepo({id});
  
    if (!task) {
      return res.status(404).json({error: 'No such task'})
    }
  
    res.status(200).json(task)
}


// create a new task
const createTask = async (req, res) => {
    const {title} = req.body
    console.log(req.body)
  
    // add to the database
    try {
      const user_id = req.user._id;
      // const task = await Task.create({ title, user_id })

      const task = await createTaskRepo({title, user_id});
      res.status(200).json(task)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
}



// delete a task
const deleteTask = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such task'})
    }
  
    // const task = await Task.findOneAndDelete({_id: id})

    const task = await deleteTaskRepo({_id: id})
  
    if(!task) {
      return res.status(400).json({error: 'No such task'})
    }
  
    res.status(200).json(task)

}

// update a task
const updateTask = async (req, res) => {


  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such task'})
  }

  const task = await updateTaskRepo({ id, ...req.body });


  // const task = await Task.findOneAndUpdate({_id: id}, {
  //   ...req.body
  // })

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)

}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
}