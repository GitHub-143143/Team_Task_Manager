import { useState } from "react";
import axios from "axios";

const API = "https://team-task-manager-production-d6e6.up.railway.app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // 🔥 IMPORTANT: Save user also
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login success");

      window.location.href = "/dashboard";

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <p>
        Don't have an account? <a href="/signup">Signup here</a>
      </p>
    </div>
  );
}