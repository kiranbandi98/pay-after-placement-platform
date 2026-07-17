"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [round2Progress, setRound2Progress] = useState(0);

const [studentName, setStudentName] = useState("");
const [studentEmail, setStudentEmail] = useState("");

useEffect(() => {

 const userId =
  localStorage.getItem("userId");

const email =
  localStorage.getItem("studentEmail");

const name =
  localStorage.getItem("studentName");

if (!userId) {
  window.location.href = "/login";
  return;
}

setStudentEmail(email || "");
setStudentName(name || "");


}, []);
useEffect(() => {

  const userId = localStorage.getItem("userId");

if (!userId) return;

fetch(`https://pay-after-placement-platform.onrender.com/api/progress/round2/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Progress API:", data);
      setRound2Progress(data.dashboardRound2);
    })
    .catch((err) => {
      console.error("Progress API Error:", err);
    });

}, []);

const handleLogout = () => {

  localStorage.removeItem("userId");
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
    <h2> Company wise modules</h2>
  </div>

  
     <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>
  <div style={cardStyle}>
    <h3>Placement Preparation</h3>
    <p>100 Coding Questions</p>
    <p style={{ color: "#a1a1aa" }}>
      Easy → Medium → Hard
    </p>

    <Link href="/placement-preparation">
      <button style={buttonStyle}>
        Start Learning
      </button>
    </Link>
  </div>

 <div
  style={{
    ...cardStyle,
    border: "2px solid #8b5cf6",
    borderRadius: "18px",
    padding: "24px",
    background: "linear-gradient(180deg,#18181b,#09090b)",
  }}
>
  <h2
    style={{
      color: "#a855f7",
      marginBottom: "5px",
      fontSize: "26px",
      fontWeight: "bold",
    }}
  >
    🏢 Accenture Module
  </h2>

  <p
    style={{
      color: "#a1a1aa",
      marginBottom: "20px",
      fontSize: "15px",
    }}
  >
    Company Assessment Progress
  </p>

  {
  [
  { name: "Round 1", value: 0 },
  { name: "Round 2", value: round2Progress },
  { name: "Round 3", value: 0 },
  { name: "Round 4", value: 0 },
] 
  .map((round) => (
    <div key={round.name} style={{ marginBottom: "18px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
          fontWeight: "bold",
        }}
      >
        <span>{round.name}</span>
        <span>{round.value}%</span>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#27272a",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${round.value}%`,
            height: "100%",
            background:
              "linear-gradient(90deg,#8b5cf6,#a855f7)",
            borderRadius: "20px",
            transition: "0.4s",
          }}
        />
      </div>
    </div>
  ))}

  <Link href="/accenture">
    <button
      style={{
        ...buttonStyle,
        width: "100%",
        marginTop: "10px",
      }}
    >
      ▶️Start Learning
    </button>
  </Link>
</div>

  <div style={cardStyle}>
    <h3>Coding Round</h3>
     
    <p style={{ color: "#a1a1aa" }}>
      
    </p>

    <Link href="/accenture/coding">
      <button style={buttonStyle}>
        Start Learning
      </button>
    </Link>
  </div>

  <div style={cardStyle}>
    <h3>Communication Round</h3>
     
    <p style={{ color: "#facc15" }}>
      Coming Soon
    </p>

    <Link href="/accenture/communication">
      <button style={buttonStyle}>
        Open Module
      </button>
    </Link>
  </div>

  <div style={cardStyle}>
    <h3>Behavioral Round</h3>
     
    <p style={{ color: "#facc15" }}>
       
    </p>

    <Link href="/accenture/behavioral">
      <button style={buttonStyle}>
        Open Module
      </button>
    </Link>
  </div>

  <div style={cardStyle}>
    <h3>Mock Interview</h3>
    <p>AI Mock Interview </p>
    <p style={{ color: "#facc15" }}>
      Coming Soon
    </p>

    <Link href="/mock-interview">
      <button style={buttonStyle}>
        Open Module
      </button>
    </Link>
  </div>
</div>
<div style={{ marginTop: "60px" }}>
  <h2
    style={{
      color: "#a855f7",
      fontSize: "32px",
      marginBottom: "20px",
    }}
  >
    
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(320px,1fr))",
      gap: "20px",
    }}
  >


{/* TCS Module */}
<div style={cardStyle}>
  <div>
    <h3>🏢 TCS Module</h3>
  </div>
   <Link href="/tcs">
  <button style={buttonStyle}>
    Start Learning
  </button>
</Link>
</div>

{/* Infosys */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Infosys</h3>
    <p>Hiring: 20,000 Freshers</p>
    <p>Roles: DSE, SP</p>
    <p>Package: ₹6.25–21 LPA</p>
    <p>Eligibility: 60%+, No Backlogs</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* Cognizant */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Cognizant</h3>
    <p>Hiring: 24,000–25,000 Freshers</p>
    <p>Roles: GenC, GenC Next</p>
    <p>Package: ₹4.0–6.5 LPA</p>
    <p>Eligibility: 60%+, No Backlogs</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* Wipro */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Wipro</h3>
    <p>Hiring: 7,500–8,000 Freshers</p>
    <p>Roles: Project Engineer</p>
    <p>Package: ₹3.5 LPA</p>
    <p>Eligibility: 60%+, Max 1 Backlog</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* HCLTech */}
<div style={cardStyle}>
  <div>
    <h3>🏢 HCLTech</h3>
    <p>Hiring: Graduate Hiring Program</p>
    <p>Roles: Graduate Trainee, Software Engineer Trainee</p>
    <p>Package: ₹3.25–4.25 LPA</p>
    <p>Eligibility: 70%+, No Backlogs</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* Tech Mahindra */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Tech Mahindra</h3>
    <p>Hiring: Campus Recruitment Drive</p>
    <p>Roles: Associate Software Engineer</p>
    <p>Package: ₹3.25–5.5 LPA</p>
    <p>Eligibility: 60%+, No Backlogs</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* Capgemini */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Capgemini</h3>
    <p>Hiring: Exceller Program</p>
    <p>Roles: ASE, Senior Analyst</p>
    <p>Package: ₹4.0–7.5 LPA</p>
    <p>Eligibility: 60%+, No Backlogs</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* LTIMindtree */}
<div style={cardStyle}>
  <div>
    <h3>🏢 LTIMindtree</h3>
    <p>Hiring: T-School Recruitment</p>
    <p>Roles: GET</p>
    <p>Package: ₹4.05 LPA</p>
    <p>Eligibility: 60%+, No Backlogs</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* DXC */}
<div style={cardStyle}>
  <div>
    <h3>🏢 DXC Technology</h3>
    <p>Hiring: Campus Hiring Drive</p>
    <p>Roles: Associate Software Engineer</p>
    <p>Package: ₹4.0–4.5 LPA</p>
    <p>Eligibility: 60%+, No Backlogs</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* Hexaware */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Hexaware</h3>
    <p>Hiring: Graduate Hiring Program</p>
    <p>Roles: GET, PGET</p>
    <p>Package: ₹4.0–6.0+ LPA</p>
    <p>Eligibility: 60%+, No Backlogs</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>
{/* IBM */}
<div style={cardStyle}>
  <div>
    <h3>🏢 IBM</h3>
    <p>Hiring: Campus Recruitment</p>
    <p>Roles: Associate System Engineer</p>
    <p>Package: ₹4.25–4.5 LPA</p>
    <p>Eligibility: 65%+ / 6.5 CGPA</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* CGI */}
<div style={cardStyle}>
  <div>
    <h3>🏢 CGI</h3>
    <p>Hiring: Graduate Drive</p>
    <p>Roles: Associate Software Engineer, Technical Analyst</p>
    <p>Package: ₹4.0–6.6 LPA</p>
    <p>Eligibility: 60%+</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* Zensar */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Zensar</h3>
    <p>Hiring: Off-Campus Program</p>
    <p>Roles: Graduate Engineer Trainee (GET)</p>
    <p>Package: ₹4.0 LPA</p>
    <p>Eligibility: 60%+</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* LTTS */}
<div style={cardStyle}>
  <div>
    <h3>🏢 LTTS</h3>
    <p>Hiring: Campus Recruitment</p>
    <p>Roles: Engineer Trainee, Software Platform Engineer</p>
    <p>Package: ₹4.0–5.5 LPA</p>
    <p>Eligibility: 60%+</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* Zoho */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Zoho</h3>
    <p>Hiring: Off-Campus Drive</p>
    <p>Roles: Software Developer, QA Engineer</p>
    <p>Package: ₹4.6–12.0 LPA</p>
    <p>Eligibility: 60%+ / 6.5 CGPA</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

{/* Deloitte */}
<div style={cardStyle}>
  <div>
    <h3>🏢 Deloitte</h3>
    <p>Hiring: Campus Excellence Program</p>
    <p>Roles: Associate Analyst, Technology Analyst</p>
    <p>Package: ₹4.5–6.5 LPA</p>
    <p>Eligibility: 60%+</p>
  </div>
  <button style={{ ...buttonStyle, width: "100%" }}>
    Coming Soon
  </button>
</div>

  </div>
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
