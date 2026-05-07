import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function Dashboard() {
  const [data, setData] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/dashboard`, {
          headers: {
            Authorization: "Bearer " + token
          }
        });

        setData(res.data);
      } catch (err) {
        console.log(err.response?.data || err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total: {data.total || 0}</p>
      <p>Pending: {data.pending || 0}</p>
      <p>Done: {data.done || 0}</p>
      <p>Overdue: {data.overdue || 0}</p>

      <a href="/project">Create Project</a>
      <br />
      <a href="/task">Manage Tasks</a>
    </div>
  );
}