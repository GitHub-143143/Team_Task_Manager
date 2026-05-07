const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// 🔥 CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const { title, project, assignedTo, dueDate } = req.body;

    // ✅ validation
    if (!title || !project || !assignedTo) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const task = new Task({
      title,
      project,
      assignedTo,
      dueDate,
      status: "pending"
    });

    await task.save();
    res.json(task);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// 🔥 GET TASKS (with project + user info)
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project", "name")
      .populate("assignedTo", "name email");

    res.json(tasks);

  } catch (err) {
    res.status(500).json(err);
  }
});


// 🔥 UPDATE TASK STATUS
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;