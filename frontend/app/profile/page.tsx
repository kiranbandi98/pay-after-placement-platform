"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {

    const email =
      localStorage.getItem("studentEmail");

    if (!email) {
      window.location.href = "/login";
      return;
    }

    fetch(
      `https://pay-after-placement-platform.onrender.com/api/profile/${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });

  }, []);

  if (!profile) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          width: "500px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          My Profile
        </h1>

        <hr />

        <p><strong>Name:</strong> {profile.name}</p>

        <p><strong>Email:</strong> {profile.email}</p>

        <p><strong>Phone:</strong> {profile.phone}</p>

        <p><strong>College:</strong> {profile.college}</p>

        <p><strong>Branch:</strong> {profile.branch}</p>

        <p>
          <strong>Graduation Year:</strong>{" "}
          {profile.graduation_year}
        </p>

        <p>
          <strong>Favorite Language:</strong>{" "}
          {profile.favorite_language}
        </p>

        <p>
          <strong>Career Track:</strong>{" "}
          {profile.career_track}
        </p>

        <p>
          <strong>Dream Company:</strong>{" "}
          {profile.dream_company}
        </p>

        <button
          onClick={() =>
            (window.location.href =
              "/complete-profile")
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Edit Profile
        </button>
      </div>
    </main>
  );
}