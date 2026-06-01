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
        <h2>Practice Modules</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* Coding Round */}

          <Link
            href="/placement-preparation/set1"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <div
              style={{
                backgroundColor: "#111",
                border: "1px solid #333",
                borderRadius: "20px",
                padding: "25px",
                minHeight: "220px",
                cursor: "pointer",
              }}
            >
              <h2>Placement Coding Round</h2>

              <p>100 Coding Questions</p>

              <p>Difficulty: Easy → Medium → Hard</p>

              <p>Progress: 0%</p>

              <button
                style={{
                  marginTop: "20px",
                  padding: "12px 24px",
                  backgroundColor: "#8b5cf6",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Start Learning
              </button>
            </div>
          </Link>

          {/* Communication */}

          <div
            style={{
              backgroundColor: "#111",
              border: "1px solid #333",
              borderRadius: "20px",
              padding: "25px",
              minHeight: "220px",
            }}
          >
            <h2>Communication Round</h2>

            <p>Communication Practice Questions</p>

            <p>Status: Coming Soon</p>
          </div>

          {/* Behavioral */}

          <div
            style={{
              backgroundColor: "#111",
              border: "1px solid #333",
              borderRadius: "20px",
              padding: "25px",
              minHeight: "220px",
            }}
          >
            <h2>Behavioral Round</h2>

            <p>HR & Behavioral Preparation</p>

            <p>Status: Coming Soon</p>
          </div>

          {/* Mock Interview */}

          <div
            style={{
              backgroundColor: "#111",
              border: "1px solid #333",
              borderRadius: "20px",
              padding: "25px",
              minHeight: "220px",
            }}
          >
            <h2>Mock Interview</h2>

            <p>AI Mock Interview Practice</p>

            <p>Status: Coming Soon</p>
          </div>
        </div>
      </div>
    </main>
  );
}