"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function TechnicalTestPage() {

  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {

    async function loadQuestions() {

      const res = await fetch(
        "https://pay-after-placement-platform-1.onrender.com/api/questions?company=accenture&set=set1"
      );

      const data = await res.json();

      const formatted = data.questions.map((q: any) => ({
        question: q.question,
        options: [
          q.option_a,
          q.option_b,
          q.option_c,
          q.option_d
        ],
        answer: q.correct_answer
      }));

      setQuestions(formatted);
      setAnswers(new Array(formatted.length).fill(null));
    }

    loadQuestions();

  }, []);

  useEffect(() => {

    if (questions.length === 0) return;

    if (timeLeft === 0) {
      submitTest();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft, questions]);

  function selectAnswer(value: number) {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  }

  function nextQuestion() {

    if (answers[current] === null) {
      alert("Please select an answer");
      return;
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      submitTest();
    }
  }

  function submitTest() {

    let score = 0;

    questions.forEach((q, index) => {
      if (String(answers[index]) === String(q.answer)) {

        score++;
      }
    });

    localStorage.setItem("technicalScore", score.toString());

    router.push("/accenture/result");
  }

  if (questions.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading questions...</p>;
  }

  const q = questions[current];

  const progress = Math.round(((current + 1) / questions.length) * 100);

   return (
  <div className="min-h-screen bg-[#f5f7fb]">

    {/* HEADER */}
    <div className="bg-[#07142b] text-white px-8 py-5 flex justify-between items-center">

      <div className="flex items-center gap-5">

        <h1 className="text-2xl font-bold">
          accenture
        </h1>

        <div className="h-8 w-[1px] bg-gray-500" />

        <h2 className="text-xl">
          Technical Test
        </h2>
      </div>

      <div className="text-xl font-semibold">
        ⏱ Time Remaining:
        {" "}
        {Math.floor(timeLeft / 60)}
        :
        {String(timeLeft % 60).padStart(2, "0")}
      </div>
    </div>

    {/* INSTRUCTIONS */}
    <div className="bg-[#eef4ff] border mx-6 mt-5 rounded-xl px-6 py-5">

      <h2 className="text-blue-700 font-bold mb-4 text-lg">
        ℹ Test Instructions
      </h2>

      <div className="flex flex-wrap gap-8 text-gray-700">

        <p>📋 Total Questions: {questions.length}</p>

        <p>🕒 Total Time: 45 Minutes</p>

        <p>🎯 Each question carries 1 mark</p>

        <p>🛡 No negative marking</p>

        <p>❗ Test auto-submits after timer ends</p>

      </div>
    </div>

    {/* MAIN BOX */}
    <div className="mx-6 mt-5 bg-white border rounded-xl overflow-hidden">

      <div className="grid grid-cols-2 min-h-[500px]">

        {/* LEFT */}
        <div className="border-r p-10">

          <p className="text-lg font-semibold text-indigo-600 mb-8">
            Question {current + 1} of {questions.length}
          </p>

          <h2 className="text-4xl font-semibold leading-relaxed text-gray-900">
            {q.question}
          </h2>

        </div>

        {/* RIGHT */}
        <div className="p-10">

          <h2 className="text-2xl font-bold mb-10">
            Select the correct answer
          </h2>

          <div className="space-y-4">

           {q.options.map((opt: any, index: number) => (

  <div
    key={index}
    onClick={() => selectAnswer(opt)}
    className={`border rounded-2xl p-4 cursor-pointer transition-all duration-300 flex items-center gap-4
    ${
      answers[current] === opt
        ? "border-purple-500 bg-purple-50 shadow-md"
        : "border-gray-200 bg-white hover:border-purple-300"
    }`}
  >

    <div
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
      ${
        answers[current] === opt
          ? "border-purple-600"
          : "border-gray-400"
      }`}
    >

      {answers[current] === opt && (
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
      )}

    </div>

    <p className="text-lg font-medium text-black">
      {String.fromCharCode(65 + index)}. {opt}
    </p>

  </div>

))}

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t bg-white px-8 py-6">

        <div className="flex justify-between items-center">

          <button
            onClick={() => current > 0 && setCurrent(current - 1)}
            className="border border-purple-500 text-purple-600 px-8 py-3 rounded-xl font-semibold"
          >
            ← Previous
          </button>

          <div className="flex flex-col items-center w-[40%]">

            <p className="font-bold text-lg mb-2">
              Progress: {progress}%
            </p>

            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

              <div
                className="bg-purple-600 h-full rounded-full"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>

            <p className="mt-2 text-gray-600">
              {current + 1} of {questions.length} answered
            </p>
          </div>

          <button
            onClick={nextQuestion}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold"
          >
            {current === questions.length - 1
              ? "Submit Test"
              : "Next Question →"}
          </button>

        </div>

        <div className="flex justify-center gap-10 mt-8">

          <button className="border px-8 py-3 rounded-xl">
            🚩 Mark for Review
          </button>

          <button
            onClick={submitTest}
            className="border border-red-400 text-red-500 px-8 py-3 rounded-xl"
          >
            ⏻ Submit Test
          </button>

        </div>

      </div>

    </div>
  </div>
);
}