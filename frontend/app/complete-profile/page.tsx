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
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h1>Complete Profile</h1>

      <br />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="College"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Graduation Year"
        value={graduationYear}
        onChange={(e) => setGraduationYear(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Favorite Language"
        value={favoriteLanguage}
        onChange={(e) => setFavoriteLanguage(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Career Track"
        value={careerTrack}
        onChange={(e) => setCareerTrack(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Dream Company"
        value={dreamCompany}
        onChange={(e) => setDreamCompany(e.target.value)}
      />

      <br />
      <br />

      <button>
        Save Profile
      </button>
    </main>
  );
}