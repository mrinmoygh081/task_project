const Task = require("../model/taskModel");

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${id}` });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${id}` });
    }
    res.status(200).json({ msg: `Task Deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// with put we update all the fields with the field we want to update
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${id}` });
    }
    res.status(200).json({ msg: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// with patch we update only the field we want to update
const updatePatchTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${id}` });
    }
    res.status(200).json({ msg: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getTask,
  createTask,
  getSingleTask,
  deleteTask,
  updateTask,
  updatePatchTask,
};
