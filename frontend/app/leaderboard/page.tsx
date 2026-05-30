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
        const res = await fetch("http://localhost:5000/api/leaderboard");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "80px" }}>

      <h1>🏆 Leaderboard</h1>

      <table
        style={{
          margin: "40px auto",
          borderCollapse: "collapse",
          width: "700px"
        }}
      >
        <thead>
          <tr style={{ background: "#0070f3", color: "white" }}>
            <th style={{ padding: "10px" }}>Rank</th>
            <th style={{ padding: "10px" }}>Student Name</th>
            <th style={{ padding: "10px" }}>Company</th>
            <th style={{ padding: "10px" }}>Score</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {index + 1}
              </td>

              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {item.student_name}
              </td>

              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {item.company}
              </td>

              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {item.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href="/dashboard">
        <button
          style={{
            padding: "10px 20px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Back to Dashboard
        </button>
      </Link>

    </main>
  );
}
