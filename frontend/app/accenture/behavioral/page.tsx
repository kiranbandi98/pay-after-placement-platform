"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  "Strongly Disagree",
  "Disagree",
  "Slightly Disagree",
  "Neither agree nor disagree",
  "Slightly Agree",
  "Agree",
  "Strongly Agree",
];

export default function BehavioralPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [loading, setLoading] = useState(true);

  const submittedRef = useRef(false);

  // ✅ FETCH QUESTIONS
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/questions?company=accenture&category=behavioral"
        );

        const data = await res.json();

        if (data?.questions?.length > 0) {
          setQuestions(data.questions);
          setAnswers(new Array(data.questions.length).fill(null));
        } else {
          console.error("No questions found");
        }
      } catch (err) {
        console.error("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // ✅ TIMER (AUTO SUBMIT)
  useEffect(() => {
    if (timeLeft <= 0 && !submittedRef.current) {
      submittedRef.current = true;
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ HANDLE ANSWER
  const handleAnswer = (value: number) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);

    if (current < questions.length - 1) {
      setTimeout(() => setCurrent((prev) => prev + 1), 200);
    }
  };

  // ✅ PREVIOUS
  const handlePrevious = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  // ✅ SUBMIT (FINAL FIX 🔥)
  const handleSubmit = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    try {
      const formattedAnswers = answers.map((ans, index) => ({
        question_id: questions[index]?.id,
        selected_answer: ans !== null ? ans.toString() : null,
      }));

      const res = await fetch("http://localhost:5000/api/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          answers: formattedAnswers,
        }),
      });

      const data = await res.json();

      console.log("RESULT:", data);

      // ✅ BEHAVIORAL = NON ELIMINATION
      alert("✅ Behavioral Assessment Completed\nYou are eligible for Cognitive Round");

      router.push("/accenture/cognitive");

    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  // ✅ FORMAT TIME
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ✅ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        ⏳ Loading questions...
      </div>
    );
  }

  // ❌ NO QUESTIONS
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ❌ No questions found (Check backend)
      </div>
    );
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white px-10 py-8">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center mb-4">
        Behavioral Assessment
      </h1>

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold">
          Question {current + 1} / {questions.length}
        </h2>

        <div className="text-red-500 font-bold text-lg">
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {/* QUESTION */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-semibold text-center mb-16 max-w-3xl">
          {questions[current]?.question}
        </h1>

        {/* OPTIONS */}
        <div className="grid grid-cols-7 gap-6 max-w-6xl w-full px-6">
          {OPTIONS.map((opt, index) => {
            const selected = answers[current] === index;

            return (
              <div
                key={index}
                onClick={() => handleAnswer(index)}
                className={`
                  h-40 flex flex-col justify-center items-center
                  rounded-2xl cursor-pointer transition-all duration-200
                  border text-center
                  ${
                    selected
                      ? "bg-gray-900 text-white scale-105 shadow-xl"
                      : "bg-gray-100 hover:bg-gray-200 hover:scale-105"
                  }
                `}
              >
                <div className="text-sm mb-2 opacity-70">
                  {index + 1}
                </div>
                <div className="text-sm font-medium px-2">
                  {opt}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">

          <button
            onClick={handlePrevious}
            className="border px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Previous
          </button>

          {current === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          )}
        </div>

        {/* PROGRESS */}
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-gray-900 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}