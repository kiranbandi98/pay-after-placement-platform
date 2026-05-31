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

const cardStyle = {
backgroundColor: "#111",
border: "1px solid #222",
borderRadius: "16px",
padding: "25px",
};

const buttonStyle = {
padding: "14px 28px",
fontSize: "16px",
cursor: "pointer",
border: "none",
borderRadius: "10px",
background:
"linear-gradient(90deg,#8b5cf6,#a855f7)",
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
padding: "30px",
}}
>


  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "40px",
    }}
  >
    <h1
      style={{
        margin: 0,
        color: "#a855f7",
      }}
    >
      Pay After Placement
    </h1>

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
      marginBottom: "40px",
    }}
  >
    <h2
      style={{
        fontSize: "34px",
        marginBottom: "10px",
      }}
    >
      Welcome Back, {studentName} 👋
    </h2>

    <p
      style={{
        color: "#a1a1aa",
        fontSize: "18px",
      }}
    >
      {studentEmail}
    </p>

    <p
      style={{
        color: "#d4d4d8",
      }}
    >
      Track your placement preparation journey
    </p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "20px",
    }}
  >

    <div style={cardStyle}>
      <h2>My Profile</h2>

      <p>Name: {studentName}</p>

      <p>Email: {studentEmail}</p>

      <Link href="/profile">
        <button style={buttonStyle}>
          View Profile
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      <h2>Your Progress</h2>

      <p>Progress: 0%</p>

      <p>Dream Company: Accenture</p>

      <p>Career Track: AI & Machine Learning</p>
    </div>

  </div>

  <div
    style={{
      marginTop: "50px",
    }}
  >
    <h2>Practice Modules</h2>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginTop: "20px",
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
      marginTop: "50px",
    }}
  >
    <h2>Your Statistics</h2>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginTop: "20px",
    }}
  >

    <div style={cardStyle}>
      <h3>Questions Solved</h3>
      <h2>0</h2>
    </div>

    <div style={cardStyle}>
      <h3>Mock Interviews</h3>
      <h2>0</h2>
    </div>

    <div style={cardStyle}>
      <h3>Leaderboard Rank</h3>
      <h2>#--</h2>
    </div>

  </div>

</main>


);
}
