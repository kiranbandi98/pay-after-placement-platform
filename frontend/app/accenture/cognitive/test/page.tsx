"use client";

import { useState, useEffect } from "react";

export default function CognitiveTest() {

  const questions = [
    {
      id: 1,
      question: "What comes next in the sequence?",
      sequence: "2, 4, 8, 16, ?",
      options: ["18", "24", "32", "64"],
      answer: "32"
    },
    {
      id: 2,
      question: "Which number is missing?",
      sequence: "3, 6, 9, 12, ?",
      options: ["15", "18", "21", "24"],
      answer: "15"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const [reviewed, setReviewed] = useState<number[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [answered, setAnswered] = useState<number[]>([]);

  const progress = ((current + 1) / questions.length) * 100;

  useEffect(() => {

    if (timeLeft === 0) {
      submitTest();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft]);

  function handleAnswer(option: string) {

    const q = questions[current];

    const updatedAnswers = [
      ...answers.filter(a => a.question_id !== q.id),
      {
        question_id: q.id,
        selected_answer: option
      }
    ];

    setAnswers(updatedAnswers);

    if (!answered.includes(current)) {
      setAnswered([...answered, current]);
    }
  }

  function markForReview() {

    if (!reviewed.includes(current)) {
      setReviewed([...reviewed, current]);
    }

  }

  async function submitTest() {

    let correct = 0;

    answers.forEach(a => {

      const q = questions.find(q => q.id === a.question_id);

      if (q && q.answer === a.selected_answer) {
        correct++;
      }

    });

    // Save score for result page
    localStorage.setItem("cognitive_score", correct.toString());

    try {

      await fetch("https://pay-after-placement-platform-1.onrender.com/api/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          answers: answers
        })
      });

    } catch (err) {

      console.log("Backend not connected yet");

    }

    // Redirect to result page
    window.location.href = "/accenture/result";
  }

  return (

    <main
  style={{
    textAlign: "center",
    marginTop: "80px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px"
  }}
>

      <h1>Cognitive Test</h1>

      <h2>Time Left: {timeLeft} sec</h2>

      <div style={{ width: "300px", margin: "20px auto", background: "#ddd" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "green",
            height: "10px"
          }}
        />
      </div>

      <p>Question {current + 1}</p>

      <p>{questions[current].question}</p>
      <p>{questions[current].sequence}</p>

      <div>

        {questions[current].options.map((opt) => (

          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            style={{
              padding: "10px",
              margin: "10px",
              background:
                answers.find(a => a.question_id === questions[current].id)?.selected_answer === opt
                  ? "green"
                  : "white"
            }}
          >
            {opt}
          </button>

        ))}

      </div>

      <button
        onClick={markForReview}
        style={{
          padding: "10px",
          marginTop: "10px",
          background: "orange",
          border: "none"
        }}
      >
        Mark for Review
      </button>

      <hr style={{ marginTop: "40px" }} />

      <h3>Question Navigation</h3>

      <div>

        {questions.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              padding: "10px",
              margin: "5px",
              background: answered.includes(index)
                ? "green"
                : reviewed.includes(index)
                ? "orange"
                : "lightgray"
            }}
          >
            {index + 1}
          </button>

        ))}

      </div>

      <hr style={{ marginTop: "40px" }} />

      <button
        onClick={submitTest}
        style={{
          padding: "12px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Submit Test
      </button>

    </main>
  );
}
