 

//ption value="beginner">Beginner Practice</option>
//ption value="indian">Indian Company Interview</option>
//ption value="international">International Interview</option>
//ption value="advanced">Advanced Technical</option>
//ption value="elite">Elite Challenge</option>//

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InterviewPage() {

  const router = useRouter();

  const [mode, setMode] = useState("normal");
  const [company, setCompany] = useState("accenture");

  const startInterview = () => {

    if (mode === "company") {
      router.push(`/interview/session?mode=company&company=${company}`);
    } else {
      router.push(`/interview/session?mode=normal`);
    }

  };

  return (

    <div style={{ padding: "40px", textAlign: "center" }}>

      <h1>🎯 AI Interview Platform</h1>

      <h3>Select Interview Type</h3>

      {/* MODE SELECT */}
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px" }}
      >
        <option value="normal">🤖 AI Resume Interview</option>
        <option value="company">🏢 Company Practice</option>
      </select>

      <br />

      {/* COMPANY SELECT */}
      {mode === "company" && (
        <>
          <h4>Select Company</h4>

          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={{ padding: "10px", marginBottom: "20px" }}
          >
            <option value="accenture">Accenture</option>
            {/* Later you can add:
            <option value="tcs">TCS</option>
            <option value="infosys">Infosys</option>
            */}
          </select>
        </>
      )}

      <br />

      <button
        onClick={startInterview}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Start Interview
      </button>

    </div>
  );
}