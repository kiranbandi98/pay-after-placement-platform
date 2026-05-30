 "use client";

import { useState } from "react";

export default function SignupPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {

    try {

      const res = await fetch(
        "https://pay-after-placement-platform.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        window.location.href = "/login";
      }

    } catch (error) {

      console.error(error);

      alert("Signup failed");

    }

  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>Create Account</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSignup}>
        Create Account
      </button>

    </div>
  );

}