const Task = require('../models/TaskModels');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../utils/customError');

// @description     Get all tasks
// @route           GET /api/v1/tasks
// @access          Public
exports.getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});

  res.status(200).json({
    success: true,
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

// @description     Get single task
// @route           GET /api/v1/tasks/:id
// @access          Public
exports.getSingleTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(createCustomError(`No task with id: ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    data: {
      task,
    },
  });
});

// @description     Create new task
// @route           POST /api/v1/tasks
// @access          Private
exports.createNewTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: {
      task,
    },
  });
});

// @description     Update task
// @route           PATCH /api/v1/tasks/:id
// @access          Private
exports.updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findById(taskID);

  if (!task || !taskID) {
    return next(createCustomError(`No task with id: ${req.params.id}`));
  }

  await Task.findOneAndUpdate(taskID, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: {
      task,
    },
  });
});

// @description     Delete task
// @route           DELETE /api/v1/tasks/:id
// @access          Private
exports.deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  if (!taskID) {
    return next(createCustomError(`No task with id: ${req.params.id}`));
  }

  await Task.findOneAndDelete(taskID);

  res.status(200).json({
    success: true,
    data: {},
  });
});
