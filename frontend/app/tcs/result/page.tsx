"use client";

import Link from "next/link";

export default function TCSResultPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#111",
          border: "1px solid #333",
          borderRadius: "20px",
          padding: "40px",
          width: "700px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#8b5cf6", fontSize: "42px" }}>
          🎉 TCS Coding Round Completed
        </h1>

        <p
          style={{
            color: "#aaa",
            marginTop: "15px",
            fontSize: "18px",
          }}
        >
          Congratulations! You have completed the
          TCS Advanced Coding Assessment.
        </p>

        <hr style={{ margin: "30px 0" }} />

        <h2>Your coding test has been submitted successfully.</h2>

        <p style={{ marginTop: "20px" }}>
          Results and leaderboard will be available here.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/tcs">
            <button
              style={{
                padding: "12px 25px",
                background: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ← Back to TCS Module
            </button>
          </Link>

          <Link href="/tcs/leaderboard">
            <button
              style={{
                padding: "12px 25px",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🏆 View Leaderboard
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}