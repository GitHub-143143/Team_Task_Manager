import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function Task() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // 🔥 STATES
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/task`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  // 🔥 FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/api/project`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/auth/users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  // 🔥 ADD TASK
  const addTask = async () => {
    try {
      if (!title || !projectId || !assignedUser) {
        alert("Fill all fields");
        return;
      }

      await axios.post(
        `${API}/api/task`,
        {
          title,
          project: projectId,
          assignedTo: assignedUser,
          dueDate
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      // reset
      setTitle("");
      setProjectId("");
      setAssignedUser("");
      setDueDate("");
      fetchTasks();

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Task creation failed");
    }
  };

  // 🔥 MARK DONE
  const markDone = async (id) => {
    try {
      await axios.put(
        `${API}/api/task/${id}`,
        { status: "done" },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* 🔥 INPUT */}
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 🔥 PROJECT DROPDOWN */}
      <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* 🔥 USER DROPDOWN */}
      <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)}>
        <option value="">Assign User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>

      <button onClick={addTask}>Add Task</button>
      <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>

      {/* 🔥 TASK LIST */}
      <ul>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((t) => (
            <li key={t._id}>
              {t.title} - {t.status} - {t.project?.name} - {t.assignedTo?.name}

              {t.status !== "done" && (
                <button onClick={() => markDone(t._id)}>Done</button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}