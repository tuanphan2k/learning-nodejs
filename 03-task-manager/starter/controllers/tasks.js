import { Task } from "../models/Task.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({
    status: "success",
    data: {
      tasks,
      nbHits: tasks.length,
    },
  });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;

  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(createCustomError(`Not found ${taskId}`, 404));
  }
  res.status(201).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`Not found ${taskId}`, 404));
  }

  res.status(200).json({ id: taskId, task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findByIdAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`Not found ${taskId}`, 404));
  }
  res.status(200).json({ task: null, status: "success" });
});

export { getAllTasks, createTask, updateTask, deleteTask, getTask };
