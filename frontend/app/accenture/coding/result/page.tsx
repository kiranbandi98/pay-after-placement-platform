"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CodingResultPage() {
  useEffect(() => {

  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "/login";
    return;
  }
  setCompany(localStorage.getItem("codingCompany") || "Accenture");
  setSet(localStorage.getItem("codingSet") || "SET1");
  setScore(Number(localStorage.getItem("coding_total")) || 0);
}, []);

   const [company, setCompany] = useState("Accenture");
const [set, setSet] = useState("SET1");
const [score, setScore] = useState(0);

  const total = 3;

  const percentage =
    ((score / total) * 100).toFixed(2);

  const passed =
    Number(percentage) >= 70;

  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
          Accenture Coding Assessment
        </h1>

        <div className="space-y-5 text-xl">

          <div className="flex justify-between">
            <span>🏢 Company</span>
            <span>{company}</span>
          </div>

          <div className="flex justify-between">
            <span>📚 Set</span>
            <span>{set.toUpperCase()}</span>
          </div>

          <div className="flex justify-between">
            <span>💻 Score</span>
            <span>{score} / {total}</span>
          </div>

          <div className="flex justify-between">
            <span>📊 Percentage</span>
            <span>{percentage}%</span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>

            <span
              className={
                passed
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {passed ? "✅ PASSED" : "❌ FAILED"}
            </span>

          </div>

        </div>

        <div className="mt-10 flex flex-col gap-4">

          <Link
            href="/accenture/coding"
            className="bg-purple-600 text-white text-center py-3 rounded-xl font-semibold"
          >
            Practice Another Set
          </Link>

          <Link
            href="/accenture"
            className="border text-center py-3 rounded-xl font-semibold"
          >
            Back to Dashboard
          </Link>

        </div>

      </div>

    </main>

  );

}