"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminPage() {

  // 🔥 NEW: Anti-cheat state
  const [antiCheat, setAntiCheat] = useState(true);

  // 🔥 Load saved setting
  useEffect(() => {
    const saved = localStorage.getItem("antiCheat");
    if (saved !== null) {
      setAntiCheat(JSON.parse(saved));
    }
  }, []);

  // 🔥 Save setting
  const saveSettings = () => {
    localStorage.setItem("antiCheat", JSON.stringify(antiCheat));
    alert("Settings Saved Successfully ✅");
  };

  return (

    <div style={{ textAlign: "center", marginTop: "80px" }}>

      <h1>👨‍💼 Admin Dashboard</h1>

      <br />

      {/* 🔥 NEW SECTION: SETTINGS */}
      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px auto",
        width: "300px",
        borderRadius: "10px"
      }}>

        <h3>⚙️ Settings</h3>

        <label>
          <input
            type="checkbox"
            checked={antiCheat}
            onChange={() => setAntiCheat(!antiCheat)}
          />
          Enable Anti-Cheat
        </label>

        <br /><br />

        <button onClick={saveSettings}>
          Save Settings
        </button>

      </div>

      {/* EXISTING FEATURES (UNCHANGED) */}

      <Link href="/admin/upload">
        <button>Upload Questions</button>
      </Link>

      <br /><br />

      <Link href="/admin/questions">
        <button>View Question Bank</button>
      </Link>

      <br /><br />

      <Link href="/admin/leaderboard">
        <button>View Leaderboard</button>
      </Link>

    </div>

  );

}