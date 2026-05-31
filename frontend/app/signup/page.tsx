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
<main
style={{
minHeight: "100vh",
backgroundColor: "#000",
display: "flex",
justifyContent: "center",
alignItems: "center",
fontFamily: "Arial, sans-serif",
padding: "20px",
}}
>
<div
style={{
width: "100%",
maxWidth: "450px",
backgroundColor: "#111",
padding: "40px",
borderRadius: "20px",
border: "1px solid #333",
boxShadow: "0 0 25px rgba(139,92,246,0.3)",
}}
>
<h1
style={{
textAlign: "center",
color: "white",
marginBottom: "10px",
}}
>
Create Account </h1>

```
    <p
      style={{
        textAlign: "center",
        color: "#aaa",
        marginBottom: "30px",
      }}
    >
      Pay After Placement Platform
    </p>

    <input
      placeholder="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "15px",
        borderRadius: "10px",
        border: "1px solid #444",
        backgroundColor: "#1a1a1a",
        color: "white",
        boxSizing: "border-box",
      }}
    />

    <input
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "15px",
        borderRadius: "10px",
        border: "1px solid #444",
        backgroundColor: "#1a1a1a",
        color: "white",
        boxSizing: "border-box",
      }}
    />

    <input
      type="password"
      placeholder="Create Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "20px",
        borderRadius: "10px",
        border: "1px solid #444",
        backgroundColor: "#1a1a1a",
        color: "white",
        boxSizing: "border-box",
      }}
    />

    <button
      onClick={handleSignup}
      style={{
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "10px",
        background:
          "linear-gradient(90deg, #8b5cf6, #a855f7)",
        color: "white",
        fontSize: "18px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Create Account
    </button>
  </div>
</main>


);

}
