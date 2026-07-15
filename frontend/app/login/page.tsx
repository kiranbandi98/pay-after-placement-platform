"use client";
import { useState } from "react";
import Link from "next/link";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

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
  `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
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

localStorage.setItem("studentEmail", data.user.email);
localStorage.setItem("studentName", data.user.name);
localStorage.setItem("userId", data.user.id);

if (data.user.profile_completed) {
  window.location.href = "/dashboard";
} else {
  window.location.href = "/complete-profile";
}

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

localStorage.setItem(
  "userId",
  data.user.id
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
Student Login </h1>

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
      type="email"
      placeholder="Enter Email"
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
      placeholder="Enter Password"
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
      onClick={handleLogin}
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
      Student Login
    </button>
    <div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  }}
>
   <GoogleLogin
  onSuccess={async (credentialResponse: CredentialResponse) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: credentialResponse.credential,
          }),
        }
      );

      const data = await response.json();

      console.log("Google Response:", data);

      if (!response.ok || !data.success) {
        alert(data.message || "Google Login Failed");
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

localStorage.setItem(
  "userId",
  data.user.id
);
      if (data.user.profile_completed) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/complete-profile";
      }

    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google Login Failed");
    }
  }}
  onError={() => {
    console.log("Google Login Failed");
  }}
/>
</div>

    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Link
        href="/forgot-password"
        style={{
          color: "#a855f7",
          textDecoration: "none",
        }}
      >
        Forgot Password?
      </Link>

      <Link
        href="/signup"
        style={{
          color: "#a855f7",
          textDecoration: "none",
        }}
      >
        Create Account
      </Link>
    </div>
  </div>
</main>


);
}
