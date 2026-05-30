"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      const response = await fetch(
        "https://pay-after-placement-platform.onrender.com/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleReset}
        style={{
          padding: "12px 25px",
          cursor: "pointer",
        }}
      >
        Send Reset Link
      </button>
    </main>
  );
}