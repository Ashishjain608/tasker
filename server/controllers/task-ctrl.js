const Task = require("../models/task-model");

createTask = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Task cannot be empty",
    });
  }

  const task = new Task(body);

  if (!task) {
    return res.status(400).json({ success: false, error: err });
  }

  task
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: task._id,
        task: task,
        message: "Task Successfully created",
      });
    })
    .catch((error) => {
      console.log(req);
      return res.status(400).json({
        error,
        body,
        message: "Task not created",
      });
    });
};

updateTask = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Task cannot be empty",
    });
  }

  await Task.findOne({ _id: req.params.id }, (err, task) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Task not found!",
      });
    }

    if (!task) {
      return res.status(400).json({ success: false, error: 'Task not found!' });
    }
    task.priority = body.priority;
    task.description = body.description;
    task.completed = body.completed;
    task.createdAt = body.createdAt;
    task.deadlineDate = body.deadlineDate;
    task.updates = body.updates;
    task
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: task._id,
          task: task,
          message: "Task Successfully created",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error,
          message: "Task not updated",
        });
      });
  });
};

deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id }, (err, task) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!task) {
      return res.status(404).json({ success: false, error: `Task not found` });
    }

    return res.status(200).json({ success: true, data: task });
  }).catch((err) => console.log(err));
};

getTaskById = async (req, res) => {
  await Task.findOne({ _id: req.params.id }, (err, task) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!task) {
      return res.status(404).json({ success: false, error: `Task not found` });
    }
    return res.status(200).json({ success: true, data: task });
  });
};

getTasks = async (req, res) => {

  await Task.find({}, (err, tasks) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!tasks.length) {
      return res.status(404).json({ success: false, error: "No movies found" });
    }
    return res.status(200).json({
      success: true,
      data: tasks,
    });
  });
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTasks,
};
