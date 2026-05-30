"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Dashboard() {

  useEffect(() => {

    const email =
      localStorage.getItem("studentEmail");

    if (!email) {
      window.location.href = "/login";
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentName");

    window.location.href = "/login";

  };

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Logout Top Right */}
      <div
        style={{
          position: "absolute",
          top: "-70px",
          right: "30px",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Logout
        </button>
      </div>

      <h1>Student Dashboard</h1>

      <p
        style={{
          fontSize: "18px",
          marginTop: "10px",
        }}
      >
        Welcome to Pay After Placement Platform
      </p>

      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "25px",
        }}
      >
        <Link href="/accenture">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Accenture Practice
          </button>
        </Link>

        <Link href="/accenture/coding">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Coding Round
          </button>
        </Link>

        <Link href="/accenture/communication">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Communication Test
          </button>
        </Link>

        <Link href="/accenture/behavioral">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Behavioral Round
          </button>
        </Link>

        <Link href="/mock-interview">
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Mock Interview
          </button>
        </Link>
      </div>
    </main>
  );
}