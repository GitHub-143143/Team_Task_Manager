const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// =====================
// ✅ CREATE PROJECT
// =====================
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name required" });
    }

    const project = new Project({
      name,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    await project.save();

    res.json(project);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// =====================
// ✅ GET PROJECTS (IMPORTANT FIX)
// =====================
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();  // ✅ show all projects

    res.json(projects);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;