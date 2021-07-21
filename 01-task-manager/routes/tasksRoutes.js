const express = require('express');

// Import Controllers
const {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');

const router = express.Router();

router.route('/').get(getAllTasks).post(createNewTask);
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
