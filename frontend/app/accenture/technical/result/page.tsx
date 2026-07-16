"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TechnicalResultPage() {
 const [company, setCompany] = useState("Accenture");
const [set, setSet] = useState("SET1");
const [score, setScore] = useState(0);
const [total, setTotal] = useState(45);
useEffect(() => {
  setCompany(localStorage.getItem("technicalCompany") || "Accenture");
  setSet(localStorage.getItem("technicalSet") || "SET1");
  setScore(Number(localStorage.getItem("technicalScore")) || 0);
  setTotal(Number(localStorage.getItem("technicalTotal")) || 45);
}, []);

   const percentage =
  total > 0 ? ((score / total) * 100).toFixed(2) : "0.00";

  const passed =
    Number(percentage) >= 70;

  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
          Accenture Technical Assessment
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
            <span>🎯 Score</span>
            <span>{score} / {total}</span>
          </div>

          <div className="flex justify-between">
            <span>📊 Percentage</span>
            <span>{percentage}%</span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>

            <span className={passed ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {passed ? "✅ PASSED" : "❌ FAILED"}
            </span>

          </div>

        </div>

        <div className="mt-10 flex flex-col gap-4">

          <Link
            href="/accenture/technical"
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