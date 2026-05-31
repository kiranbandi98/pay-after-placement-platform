"use client";

import { useState } from "react";

export default function CompleteProfile() {
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [favoriteLanguage, setFavoriteLanguage] = useState("");
  const [careerTrack, setCareerTrack] = useState("");
  const [dreamCompany, setDreamCompany] = useState("");

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          width: "400px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Complete Profile
        </h1>

        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <label>College</label>
        <input
          type="text"
          placeholder="Enter College Name"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          style={inputStyle}
        />

        <label>Branch</label>
        <input
          type="text"
          placeholder="Enter Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          style={inputStyle}
        />

        <label>Graduation Year</label>
        <select
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Year</option>
          <option>2025</option>
          <option>2026</option>
          <option>2027</option>
          <option>2028</option>
        </select>

        <label>Favorite Language</label>
        <select
          value={favoriteLanguage}
          onChange={(e) => setFavoriteLanguage(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Language</option>
          <option>Java</option>
          <option>Python</option>
          <option>C++</option>
          <option>JavaScript</option>
          <option>C#</option>
        </select>

        <label>Career Track</label>
        <select
          value={careerTrack}
          onChange={(e) => setCareerTrack(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Career Track</option>
          <option>AI & Machine Learning</option>
          <option>Data Science</option>
          <option>Software Development</option>
          <option>Web Development</option>
          <option>Cyber Security</option>
          <option>Cloud Computing</option>
        </select>

        <label>Dream Company</label>
        <select
          value={dreamCompany}
          onChange={(e) => setDreamCompany(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Company</option>
          <option>Accenture</option>
          <option>TCS</option>
          <option>Infosys</option>
          <option>Wipro</option>
          <option>Google</option>
          <option>Microsoft</option>
          <option>Amazon</option>
          <option>Meta</option>
        </select>

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Save Profile
        </button>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "16px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px",
  boxSizing: "border-box" as const,
};