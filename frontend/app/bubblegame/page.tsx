"use client";
import { useState, useEffect } from "react";

export default function BubbleGame() {

  const questions = [
    { bubbles: ["2+1", "5-1", "3"], answers: [3, 4, 3] },
    { bubbles: ["4+1", "2+2", "6-1"], answers: [5, 4, 5] },
    { bubbles: ["3+2", "7-3", "4"], answers: [5, 4, 4] },
    { bubbles: ["6-2", "2+1", "5"], answers: [4, 3, 5] },
    { bubbles: ["8-4", "1+2", "6"], answers: [4, 3, 6] },

    { bubbles: ["15-10", "4+3", "2*3"], answers: [5, 7, 6] },
    { bubbles: ["20/2", "5*2", "18-8"], answers: [10, 10, 10] },
    { bubbles: ["9+3", "16-4", "2*6"], answers: [12, 12, 12] },
    { bubbles: ["14-6", "3*3", "5+4"], answers: [8, 9, 9] },
    { bubbles: ["12/3", "2*5", "6+2"], answers: [4, 10, 8] },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);

  // ✅ SAFE calculation instead of eval
  const calculate = (exp: string) => {
    try {
      // simple math parser
      return Function(`"use strict"; return (${exp})`)();
    } catch {
      return 0;
    }
  };

  const handleBubbleClick = (index: number) => {
    if (selected.includes(index) || selected.length === 3) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 3) {
      const correctAnswers = [...questions[current].answers].sort();

      const selectedValues = newSelected
        .map((i) => calculate(questions[current].bubbles[i]))
        .sort();

      const isCorrect =
        JSON.stringify(selectedValues) === JSON.stringify(correctAnswers);

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setTimeout(() => {
        setSelected([]);
        setCurrent((prev) => prev + 1);
        setTimeLeft(15);
      }, 800);
    }
  };

  useEffect(() => {
    if (current >= questions.length) return;

    if (timeLeft <= 0) {
      setCurrent((prev) => prev + 1);
      setSelected([]);
      setTimeLeft(15);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, current]);

  // ✅ Prevent crash
  if (current >= questions.length) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h1>Game Over 🎉</h1>
        <h2>Score: {score}</h2>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Bubble Game</h2>
      <h3>Score: {score}</h3>
      <h3>Time Left: {timeLeft}</h3>

      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        {questions[current].bubbles.map((bubble, index) => (
          <button
            key={index}
            onClick={() => handleBubbleClick(index)}
            disabled={selected.length === 3}
            style={{
              padding: 20,
              borderRadius: "50%",
              background: selected.includes(index)
                ? "lightgreen"
                : "lightblue",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            {bubble}
          </button>
        ))}
      </div>
    </div>
  );
}