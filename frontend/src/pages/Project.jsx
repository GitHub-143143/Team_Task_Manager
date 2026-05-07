import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function Project() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/api/project`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      setProjects(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    try {
      if (!name) {
        alert("Enter project name");
        return;
      }

      await axios.post(
        `${API}/api/project`,
        { name },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      alert("Project Created");
      setName("");
      fetchProjects();

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Error creating project");
    }
  };

  return (
    <div>
      <h2>Create Project</h2>

      <input
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createProject}>Create</button>

      <h3>Projects</h3>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p._id}>• {p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}