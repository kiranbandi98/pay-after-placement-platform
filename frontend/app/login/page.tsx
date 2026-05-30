"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    // Save user email
    localStorage.setItem("studentEmail", email);

    alert("Login successful");

    window.location.href = "/dashboard";
  };

  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Student Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px",
          width: "250px",
        }}
      />

      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px",
          width: "250px",
        }}
      />

      <br />

      <button
        onClick={handleLogin}
        style={{
          padding: "12px 25px",
          fontSize: "18px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Student Login
      </button>
    </main>
  );
}