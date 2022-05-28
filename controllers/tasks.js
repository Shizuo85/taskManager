const Task = require("../models/task")
const getAllTasks =  async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch(error){
        res.status(500).json({msg : error})
    }
}

const createTask =  async (req, res) => {
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({msg: error})
    }
}

const getTask =  async (req, res) => {
    try{
        const singleTask = await Task.findOne({_id : req.params.id})

        if(!singleTask){
            return res.status(400).json({msg: `no task with id : ${req.params.id}`})
        }
        res.status(200).json({singleTask})
    } catch(error){
        res.status(500).json({msg : error})
    }
}

const updateTask =  async (req, res) => {
    try{
       const updateTask = await Task.findOneAndUpdate({_id : req.params.id}, req.body, {
           new:true,
           runValidators : true
       })
       if (!updateTask){
           return res.status(404).json({msg: `no task with id : ${req.params.id}`})
       }
       res.status(200).json(updateTask)
    } catch(error){
        res.status(500).json({msg : error})
    }
}

const deleteTask =  async (req, res) => {
    try{
        const deleteTask = await Task.findOneAndDelete({_id : req.params.id})

        if(!deleteTask){
            return res.status(404).json({msg: `no task with id : ${req.params.id}`})
        }
        res.status(200).json({deleteTask})
    } catch(error){
        res.status(500).json({msg : error})
    }
}
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}