import { useState } from "react";
import axios from "axios";

const API = "https://team-task-manager-production-d6e6.up.railway.app";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      if (!name || !email || !password) {
        alert("All fields required");
        return;
      }

      await axios.post(`${API}/api/auth/signup`, {
        name,
        email,
        password
      });

      alert("Signup successful");

    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup}>Signup</button>
    </div>
  );
}