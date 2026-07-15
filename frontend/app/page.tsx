"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  useEffect(() => {

  const userId = localStorage.getItem("userId");

  if (userId) {
    router.push("/dashboard");
  }

}, []);
  const companies = [
    "Accenture",
    "TCS",
    "Infosys",
    "Wipro",
    "Cognizant",
    "Capgemini",
  ];

  const stats = [
    { number: "25K+", label: "Students" },
    { number: "500+", label: "Companies" },
    { number: "98%", label: "Success Rate" },
    { number: "100K+", label: "Questions" },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-purple-700/30 blur-3xl"></div>
        <div className="absolute top-96 right-20 h-72 w-72 rounded-full bg-blue-700/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 h-72 w-72 rounded-full bg-indigo-700/20 blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
        <h1 className="text-3xl font-bold">
          Pay After Placement
        </h1>

        <Link href="/login">
          <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl font-semibold">
            Student Login
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">

        <div className="inline-block px-5 py-2 rounded-full bg-purple-900/60 border border-purple-500 mb-8">
          🚀 AI Powered Placement Preparation
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Crack Placements <br />
          With Artificial Intelligence
        </h1>

        <p className="max-w-3xl mx-auto text-gray-300 text-xl mt-8">
          Master Behavioral, Technical and Coding Rounds
          through an AI-driven platform designed to help
          students prepare for top IT companies.
        </p>

        <div className="flex justify-center gap-5 mt-10 flex-wrap">
          <Link href="/login">
            <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl text-lg font-semibold">
              Student Login
            </button>
          </Link>

          <button className="border border-purple-500 hover:bg-purple-900/30 px-8 py-4 rounded-xl text-lg">
            Explore Platform
          </button>
        </div>
      </section>

      {/* AI Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              AI Driven Placement Success
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              Our platform uses advanced AI concepts to help
              students prepare for interviews, technical
              assessments and coding challenges.
            </p>

            <p className="text-gray-400 mt-6">
              Practice smarter. Learn faster. Get placed.
            </p>
          </div>

          <div className="relative flex justify-center">

            <div className="h-80 w-80 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-xl absolute"></div>

            <div className="relative h-72 w-72 rounded-full border-4 border-purple-500 flex items-center justify-center text-8xl bg-black/50 backdrop-blur-lg">
              🧠
            </div>

          </div>

        </div>

      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-purple-400">
                {item.number}
              </h3>

              <p className="text-gray-300 mt-2">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-bold text-center mb-14">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold mb-3">
              Behavioral
            </h3>
            <p className="text-gray-300">
              AI-powered behavioral interview preparation.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="text-5xl mb-4">📘</div>
            <h3 className="text-2xl font-bold mb-3">
              Technical
            </h3>
            <p className="text-gray-300">
              Technical MCQs and company-specific practice.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="text-5xl mb-4">💻</div>
            <h3 className="text-2xl font-bold mb-3">
              Coding
            </h3>
            <p className="text-gray-300">
              Real coding environment with hidden test cases.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-3">
              Analytics
            </h3>
            <p className="text-gray-300">
              Track performance and improve weak areas.
            </p>
          </div>

        </div>

      </section>

      {/* Companies */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-bold text-center mb-14">
          Companies Covered
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

          {companies.map((company) => (
            <div
              key={company}
              className="bg-white/5 border border-white/10 rounded-xl p-5 text-center font-semibold"
            >
              {company}
            </div>
          ))}

        </div>

      </section>

      {/* Roadmap */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-bold text-center mb-14">
          AI Roadmap
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-purple-900/40 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">2025</h3>
            <p className="mt-3 text-gray-300">
              AI Hiring Assessments
            </p>
          </div>

          <div className="bg-purple-900/40 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">2026</h3>
            <p className="mt-3 text-gray-300">
              Personalized Coaching
            </p>
          </div>

          <div className="bg-purple-900/40 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">2027</h3>
            <p className="mt-3 text-gray-300">
              Skill Gap Detection
            </p>
          </div>

          <div className="bg-purple-900/40 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">2030+</h3>
            <p className="mt-3 text-gray-300">
              AI Career Ecosystem
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center">

        <h3 className="text-2xl font-bold mb-3">
          Pay After Placement Platform
        </h3>

        <p className="text-gray-400">
          AI Powered Placement Preparation Platform
        </p>

        <p className="text-gray-500 mt-4">
          © 2026 All Rights Reserved
        </p>

      </footer>

    </main>
  );
}