const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);
// Replace with your MongoDB Atlas URL
mongoose.connect("mongodb://project-24:Rolex143@ac-igu17zi-shard-00-00.cr0gx8d.mongodb.net:27017,ac-igu17zi-shard-00-01.cr0gx8d.mongodb.net:27017,ac-igu17zi-shard-00-02.cr0gx8d.mongodb.net:27017/?ssl=true&replicaSet=atlas-129yss-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));
console.log("UPDATED VERSION");