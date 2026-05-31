"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {

const [studentName, setStudentName] = useState("");
const [studentEmail, setStudentEmail] = useState("");

useEffect(() => {

const email =
  localStorage.getItem("studentEmail");

const name =
  localStorage.getItem("studentName");

setStudentEmail(email || "");
setStudentName(name || "");

if (!email) {
  window.location.href = "/login";
}


}, []);

const handleLogout = () => {


localStorage.removeItem("studentEmail");
localStorage.removeItem("studentName");

window.location.href = "/login";


};

const buttonStyle = {
padding: "14px 28px",
fontSize: "16px",
cursor: "pointer",
border: "none",
borderRadius: "10px",
background:
"linear-gradient(90deg, #8b5cf6, #a855f7)",
color: "white",
fontWeight: "bold",
};

return (
<main
style={{
minHeight: "100vh",
backgroundColor: "#000",
color: "white",
fontFamily: "Arial, sans-serif",
padding: "40px",
}}
>
<div
style={{
display: "flex",
justifyContent: "flex-end",
}}
>
<button
onClick={handleLogout}
style={{
padding: "10px 20px",
backgroundColor: "#dc2626",
color: "white",
border: "none",
borderRadius: "8px",
cursor: "pointer",
}}
>
Logout </button> </div>

```
  <div
    style={{
      textAlign: "center",
      marginTop: "30px",
    }}
  >
    <h1>Student Dashboard</h1>

    <p
      style={{
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      Welcome {studentName}
    </p>

    <p
      style={{
        color: "#a1a1aa",
      }}
    >
      {studentEmail}
    </p>

    <p
      style={{
        marginTop: "10px",
        color: "#d4d4d8",
      }}
    >
      Welcome to Pay After Placement Platform
    </p>
  </div>

  <div
    style={{
      backgroundColor: "#111",
      border: "1px solid #333",
      borderRadius: "16px",
      padding: "25px",
      marginTop: "40px",
      textAlign: "center",
    }}
  >
    <h2>Student Profile</h2>

    <p>Manage your profile information</p>

    <Link href="/profile">
      <button style={buttonStyle}>
        My Profile
      </button>
    </Link>
  </div>

  <div
    style={{
      marginTop: "50px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <Link href="/accenture">
      <button style={buttonStyle}>
        Accenture Practice
      </button>
    </Link>

    <Link href="/accenture/coding">
      <button style={buttonStyle}>
        Coding Round
      </button>
    </Link>

    <Link href="/accenture/communication">
      <button style={buttonStyle}>
        Communication Test
      </button>
    </Link>

    <Link href="/accenture/behavioral">
      <button style={buttonStyle}>
        Behavioral Round
      </button>
    </Link>

    <Link href="/mock-interview">
      <button style={buttonStyle}>
        Mock Interview
      </button>
    </Link>
  </div>

  <div
    style={{
      backgroundColor: "#111",
      border: "1px solid #333",
      borderRadius: "16px",
      padding: "25px",
      marginTop: "50px",
      textAlign: "center",
    }}
  >
    <h2>Your Progress</h2>

    <p>Progress: 0%</p>

    <p>Dream Company: Accenture</p>

    <p>Career Track: AI & Machine Learning</p>
  </div>
</main>


);
}
