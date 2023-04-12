const express = require("express");
const {
  createTask,
  getTask,
  getSingleTask,
  deleteTask,
  updateTask,
  updatePatchTask,
} = require("../controllers/taskController");
const router = express.Router();

// Routes
router.route("/").get(getTask).post(createTask);
router
  .route("/:id")
  .get(getSingleTask)
  .delete(deleteTask)
  .put(updateTask)
  .patch(updatePatchTask);

module.exports = router;
