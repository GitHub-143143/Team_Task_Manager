const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    // 🔥 GET ALL TASKS (for demo)
    const tasks = await Task.find();

    const total = tasks.length;

    const pending = tasks.filter(
      (t) => t.status === "pending"
    ).length;

    const done = tasks.filter(
      (t) => t.status === "done"
    ).length;

    const overdue = tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "done"
    ).length;

    res.json({
      total,
      pending,
      done,
      overdue
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;