"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type LeaderboardItem = {
student_name: string;
company: string;
score: number;
};

export default function LeaderboardPage() {

const [data, setData] = useState<LeaderboardItem[]>([]);

useEffect(() => {
const fetchLeaderboard = async () => {
try {
const res = await fetch(
"https://pay-after-placement-platform-1.onrender.com/api/leaderboard"
);


    const result = await res.json();

    setData(result);

  } catch (error) {
    console.error("Leaderboard fetch error:", error);
  }
};

fetchLeaderboard();


}, []);

return (
<main
style={{
minHeight: "100vh",
backgroundColor: "#000",
color: "white",
padding: "40px",
fontFamily: "Arial, sans-serif",
}}
>
<div
style={{
textAlign: "center",
marginBottom: "40px",
}}
>
<h1
style={{
fontSize: "40px",
marginBottom: "10px",
}}
>
🏆 Leaderboard </h1>

```
    <p
      style={{
        color: "#a1a1aa",
      }}
    >
      Top Performing Students
    </p>
  </div>

  <div
    style={{
      maxWidth: "1000px",
      margin: "0 auto",
      backgroundColor: "#111",
      border: "1px solid #333",
      borderRadius: "16px",
      overflow: "hidden",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            background:
              "linear-gradient(90deg,#8b5cf6,#a855f7)",
          }}
        >
          <th style={{ padding: "16px" }}>Rank</th>
          <th style={{ padding: "16px" }}>Student</th>
          <th style={{ padding: "16px" }}>Company</th>
          <th style={{ padding: "16px" }}>Score</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            style={{
              borderBottom: "1px solid #333",
            }}
          >
            <td
              style={{
                padding: "16px",
                textAlign: "center",
              }}
            >
              #{index + 1}
            </td>

            <td
              style={{
                padding: "16px",
              }}
            >
              {item.student_name}
            </td>

            <td
              style={{
                padding: "16px",
              }}
            >
              {item.company}
            </td>

            <td
              style={{
                padding: "16px",
                fontWeight: "bold",
              }}
            >
              {item.score}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div
    style={{
      textAlign: "center",
      marginTop: "30px",
    }}
  >
    <Link href="/dashboard">
      <button
        style={{
          padding: "14px 28px",
          border: "none",
          borderRadius: "10px",
          background:
            "linear-gradient(90deg,#8b5cf6,#a855f7)",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Back to Dashboard
      </button>
    </Link>
  </div>
</main>

);
}
