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
Forgot Password </h1>

```
    <p
      style={{
        textAlign: "center",
        color: "#aaa",
        marginBottom: "30px",
      }}
    >
      Enter your registered email address
    </p>

    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
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
      onClick={handleReset}
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
      Send Reset Link
    </button>
  </div>
</main>


);
}
