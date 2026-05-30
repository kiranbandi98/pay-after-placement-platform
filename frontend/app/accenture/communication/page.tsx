"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommunicationRound() {

  const router = useRouter();

  const questions = [
    {
      question: "Choose the correct sentence",
      options: [
        "He go to office",
        "He goes to office",
        "He going office",
        "He gone office"
      ],
      answer: "He goes to office"
    },
    {
      question: "Choose the correct word",
      options: [
        "accept",
        "except",
        "expect",
        "access"
      ],
      answer: "accept"
    }
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (qIndex: number, option: string) => {

    const updated = [...selected];
    updated[qIndex] = option;
    setSelected(updated);

  };

  const submitTest = () => {

    let correct = 0;

    questions.forEach((q, index) => {
      if (selected[index] === q.answer) {
        correct++;
      }
    });

    setScore(correct);

    localStorage.setItem("communication_score", String(correct));

  };

  const finishRound = () => {
    router.push("/accenture/result");
  };

  return (

    <main style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Communication Assessment</h1>

      {questions.map((q, index) => (

        <div key={index} style={{ marginTop: "20px" }}>

          <h3>{q.question}</h3>

          {q.options.map((option, i) => (

            <div key={i}>

              <input
                type="radio"
                name={"q" + index}
                value={option}
                onChange={() => handleSelect(index, option)}
              />

              {option}

            </div>

          ))}

        </div>

      ))}

      <br />

      <button
        onClick={submitTest}
        style={{
          padding: "10px 20px",
          background: "orange",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        Submit
      </button>

      {score !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your Score: {score} / {questions.length}</h3>

          <button
            onClick={finishRound}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Finish Assessment
          </button>
        </div>
      )}

    </main>

  );

}