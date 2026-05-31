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
      Logout
    </button>
  </div>

  <div
    style={{
      textAlign: "center",
      marginTop: "20px",
    }}
  >
    <h1>Student Dashboard</h1>

    <h2>
      Welcome {studentName}
    </h2>

    <p
      style={{
        color: "#a1a1aa",
      }}
    >
      {studentEmail}
    </p>
  </div>

  <div
    style={{
      display: "flex",
      gap: "20px",
      marginTop: "40px",
      flexWrap: "wrap",
    }}
  >

    <div
      style={{
        flex: 1,
        minWidth: "320px",
        backgroundColor: "#111",
        border: "1px solid #333",
        borderRadius: "16px",
        padding: "25px",
      }}
    >
      <h2>My Profile</h2>

      <p>Name: {studentName}</p>

      <p>Email: {studentEmail}</p>

      <Link href="/profile">
        <button style={buttonStyle}>
          View Profile
        </button>
      </Link>
    </div>

    <div
      style={{
        flex: 1,
        minWidth: "320px",
        backgroundColor: "#111",
        border: "1px solid #333",
        borderRadius: "16px",
        padding: "25px",
      }}
    >
      <h2>Your Progress</h2>

      <p>Progress: 0%</p>

      <p>Dream Company: Accenture</p>

      <p>Career Track: AI & Machine Learning</p>
    </div>

  </div>

  <div
    style={{
      marginTop: "50px",
      textAlign: "center",
    }}
  >
    <h2>Practice Modules</h2>
  </div>

  <div
    style={{
      marginTop: "30px",
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

</main>

);
}
