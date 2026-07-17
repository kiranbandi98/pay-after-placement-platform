"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CodingSetsPage() {

  const [sets, setSets] = useState<any[]>([]);

  useEffect(() => {
     const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "/login";
    return;
  }

    async function loadSets() {

      const res = await fetch(
        "https://pay-after-placement-platform.onrender.com/api/coding-question-sets?company=accenture"
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
        Accenture Coding Practice Sets
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

            <p>3 Coding Questions</p>

            <p>60 Minutes</p>

            <Link href={`/accenture/coding?set=${set.set_no}`}>

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