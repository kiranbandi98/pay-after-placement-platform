"use client";

import { useState } from "react";

export default function ResetPasswordPage() {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {

    try {

      const response = await fetch(
        "https://pay-after-placement-platform.onrender.com/api/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {

      alert("Reset password failed");

    }
  };

  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Reset Password</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleResetPassword}>
        Update Password
      </button>
    </main>
  );
}