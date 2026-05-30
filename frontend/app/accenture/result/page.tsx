"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ResultContent() {
  const params = useSearchParams();

  const [codingScores, setCodingScores] = useState<number[]>([]);
  const [codingTotal, setCodingTotal] = useState(0);
  const [cognitiveScore, setCognitiveScore] = useState(0);
  const [communicationScore, setCommunicationScore] = useState(0);
  const [interviewScore, setInterviewScore] = useState(0);

  // 🔥 NEW: Behavioral score from URL
  const behavioralScoreFromURL = Number(params.get("score") || 0);
  const behavioralTotalFromURL = Number(params.get("total") || 0);

  const [behavioralScore, setBehavioralScore] = useState(0);

  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {

    try {

      const storedCoding =
        JSON.parse(localStorage.getItem("coding_scores") || "[]");

      const storedCodingTotal =
        Number(localStorage.getItem("coding_total") || 0);

      const storedCognitive =
        Number(localStorage.getItem("cognitive_score") || 0);

      const storedCommunication =
        Number(localStorage.getItem("communication_score") || 0);

      const storedInterview =
        Number(localStorage.getItem("interview_score") || 0);

      setCodingScores(storedCoding);
      setCodingTotal(storedCodingTotal);
      setCognitiveScore(storedCognitive);
      setCommunicationScore(storedCommunication);
      setInterviewScore(storedInterview);

      // 🔥 Behavioral score (priority: URL → fallback localStorage)
      const behavioral =
        behavioralScoreFromURL ||
        Number(localStorage.getItem("behavioral_score") || 0);

      setBehavioralScore(behavioral);

      // 🔥 FINAL TOTAL
      const total =
        storedCodingTotal +
        storedCognitive +
        storedCommunication +
        storedInterview +
        behavioral;

      setFinalScore(total);

      // ✅ Save result
      saveResult(total);

    } catch (error) {
      console.error("Result loading error", error);
    }

  }, []);

  async function saveResult(score: number) {

    try {

      await fetch("https://pay-after-placement-platform-1.onrender.com/api/save-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          student_name: "Test Student",
          company: "accenture",
          score: score
        })
      });

    } catch (error) {
      console.error("Saving result failed", error);
    }

  }

  const status = finalScore >= 200 ? "Selected" : "Rejected";

  return (

    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
        textAlign: "center"
      }}
    >

      <h1>Final Assessment Result</h1>

      <hr style={{ margin: "20px" }} />

      {/* 🔥 BEHAVIORAL */}
      <h2>
        Behavioral Score: {behavioralScore} / {behavioralTotalFromURL || 350}
      </h2>

      <hr style={{ margin: "30px" }} />

      {/* CODING */}
      <h2>Coding Round Score: {codingTotal}</h2>

      <h3>Question Scores</h3>

      {codingScores.length === 0 ? (
        <p>No coding scores available</p>
      ) : (
        codingScores.map((score, index) => (
          <p key={index}>
            Question {index + 1}: {score}
          </p>
        ))
      )}

      <hr style={{ margin: "30px" }} />

      {/* COGNITIVE */}
      <h2>Cognitive Round Score: {cognitiveScore}</h2>

      <hr style={{ margin: "30px" }} />

      {/* COMMUNICATION */}
      <h2>Communication Round Score: {communicationScore}</h2>

      <hr style={{ margin: "30px" }} />

      {/* INTERVIEW */}
      <h2>Interview Round Score: {interviewScore}</h2>

      <hr style={{ margin: "30px" }} />

      {/* TOTAL */}
      <h1>Total Score: {finalScore}</h1>

      <h2
        style={{
          color: status === "Selected" ? "green" : "red"
        }}
      >
        Status: {status}
      </h2>

      <br />

      <Link href="/dashboard">
        <button
          style={{
            padding: "12px 25px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Back to Dashboard
        </button>
      </Link>

    </main>
  );
}


export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}