"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {

      const response = await fetch(
        "https://pay-after-placement-platform.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem(
        "studentEmail",
        data.user.email
      );

      localStorage.setItem(
        "studentName",
        data.user.name
      );

       alert("Login successful");

console.log(data.user);
console.log("profile_completed =", data.user.profile_completed);
if (data.user.profile_completed) {

  window.location.href = "/dashboard";

} else {

  window.location.href = "/complete-profile";

}

    } catch (error) {

      console.error(error);

      alert("Login failed");

    }
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
 <div
  style={{
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  }}
>
  <Link href="/forgot-password">
    Forgot Password?
  </Link>

  <Link href="/signup">
    Create Account
  </Link>
</div>

    </main>
  );
}