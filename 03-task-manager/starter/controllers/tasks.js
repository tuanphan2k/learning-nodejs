import { Task } from "../models/Task.js";

const getAllTasks = (req, res) => {
  res.send("All items");
};

const getTask = (req, res) => {
  const taskId = req.params.id;
  res.send(taskId);
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const updateTask = (req, res) => {
  res.send("Update task");
};

const deleteTask = (req, res) => {
  res.send("Delete task");
};

export { getAllTasks, createTask, updateTask, deleteTask, getTask };
