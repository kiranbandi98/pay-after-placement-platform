"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TechnicalSetsPage() {

  const [sets, setSets] = useState([]);

 useEffect(() => {

  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "/login";
    return;
  }

  async function loadSets() {

    const res = await fetch(
      "http://localhost:5000/api/question-sets?company=accenture&category=technical"
    );

    const data = await res.json();

    setSets(data.sets);

  }

  loadSets();

}, []);

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "40px"
      }}
    >

      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Accenture Technical Practice Sets
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px"
        }}
      >

        {sets.map((set: any) => (

          <div
            key={set.set_no}
            style={{
              background: "#1b1b1b",
              border: "1px solid #333",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center"
            }}
          >

            <h2>{set.set_no.toUpperCase()}</h2>

            <p>45 Questions</p>

            <p>45 Minutes</p>

            <Link
              href={`/accenture/technical/test?set=${set.set_no}`}
            >
              <button
                style={{
                  marginTop: "20px",
                  padding: "12px 30px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#8b5cf6",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Start
              </button>
            </Link>

          </div>

        ))}

      </div>

    </main>

  );

}