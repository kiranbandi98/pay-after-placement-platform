"use client";

import Link from "next/link";

export default function PlacementPreparation() {
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
      <h1>Placement Preparation</h1>

      <p>
        Solve coding questions and track your progress.
      </p>

      <div
        style={{
          backgroundColor: "#111",
          border: "1px solid #333",
          borderRadius: "16px",
          padding: "20px",
          marginTop: "30px",
        }}
      >
        <h2>Progress</h2>

        <p>0 / 100 Questions Solved</p>

        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor: "#222",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: "0%",
              height: "20px",
              backgroundColor: "#8b5cf6",
              borderRadius: "10px",
            }}
          />
        </div>

        <p style={{ marginTop: "10px" }}>
          Progress: 0%
        </p>
      </div>

      <div
        style={{
          marginTop: "40px",
        }}
      >
        <h2>Question Sets</h2>

        <Link href="/placement-preparation/set1">
          <button
            style={{
              padding: "12px 24px",
              marginRight: "10px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Set 1
          </button>
        </Link>

        <button
          style={{
            padding: "12px 24px",
            marginRight: "10px",
            marginTop: "10px",
          }}
        >
          Set 2
        </button>

        <button
          style={{
            padding: "12px 24px",
            marginRight: "10px",
            marginTop: "10px",
          }}
        >
          Set 3
        </button>
      </div>
    </main>
  );
}