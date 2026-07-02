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

  { bubbles: ["20/2", "5+4", "18-6"], answers: [10, 9, 12] },

  { bubbles: ["9+3", "16-5", "2*7"], answers: [12, 11, 14] },

  { bubbles: ["14-6", "3*3", "5+4"], answers: [8, 9, 9] },

  { bubbles: ["12/3", "2*5", "6+2"], answers: [4, 10, 8] },

  { bubbles: ["25-13", "4*2", "36/4"], answers: [12, 8, 9] },

  { bubbles: ["18/3", "7+2", "3*3"], answers: [6, 9, 9] },

  { bubbles: ["45/5", "6*2", "10+2"], answers: [9, 12, 12] },

  { bubbles: ["30/3", "8+4", "5*2"], answers: [10, 12, 10] },

  { bubbles: ["50/5", "9+1", "3*4"], answers: [10, 10, 12] },

  { bubbles: ["40/5", "7+5", "3*4"], answers: [8, 12, 12] },

  { bubbles: ["60/6", "8+2", "5+5"], answers: [10, 10, 10] },

  { bubbles: ["24/3", "4*3", "16-6"], answers: [8, 12, 10] },

  { bubbles: ["35/5", "10-2", "4+5"], answers: [7, 8, 9] },

  { bubbles: ["81/9", "6+5", "12-1"], answers: [9, 11, 11] },

  { bubbles: ["14+6", "5*3", "30-8"], answers: [20, 15, 22] },

  { bubbles: ["90/3", "25+4", "15*2+5"], answers: [30, 29, 35] },

  { bubbles: ["12*2", "40-14", "48/3"], answers: [24, 26, 16] },

  { bubbles: ["50-15", "5*6", "70/2+2"], answers: [35, 30, 37] },

  { bubbles: ["100/4", "20+7", "30-2"], answers: [25, 27, 28] },
];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);

  const calculate = (exp: string) => {
    try {
      return Function(`"use strict"; return (${exp})`)();
    } catch {
      return 0;
    }
  };

  const handleBubbleClick = (index: number) => {

  // ✅ Click again to remove selection
  if (selected.includes(index)) {
    setSelected(selected.filter((i) => i !== index));
    return;
  }

  // ✅ Maximum 3 selections
  if (selected.length === 3) return;

  const newSelected = [...selected, index];
  setSelected(newSelected);

   if (newSelected.length === 3) {

  const selectedValues = newSelected.map(
    (i) => calculate(questions[current].bubbles[i])
  );

 const sortedValues = [...selectedValues].sort(
  (a, b) => a - b
);

const isCorrect =
  JSON.stringify(selectedValues) ===
  JSON.stringify(sortedValues);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelected([]);
      setCurrent((prev) => prev + 1);
      setTimeLeft(15);
    }, 100);
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

   if (current >= questions.length) {

  const passed = score >= 15;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      <h1>🎉 Bubble Round Completed</h1>

      <h2>
        Score: {score} / 25
      </h2>

      <h2>
        Result:
        {passed
          ? " ✅ Eligible"
          : " ❌ Not Eligible"}
      </h2>

      {passed ? (
        <button
          onClick={() => {
            alert("Go to Door & Key Round");
          }}
          style={{
            padding: "12px 25px",
            marginTop: "20px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Continue to Door & Key →
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "12px 25px",
            marginTop: "20px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <h2 style={{ color: "#000" }}>Bubble Game</h2>

      <h3 style={{ color: "#000" }}>Score: {score}</h3>

      <h3 style={{ color: "#000" }}>
        Time Left: {timeLeft}s
      </h3>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {questions[current].bubbles.map((bubble, index) => (
          <button
            key={index}
            onClick={() => handleBubbleClick(index)}
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              border: selected.includes(index)
                ? "4px solid #000"
                : "2px solid #666",

              background: selected.includes(index)
                ? "#4b5563"
                : "#ffffff",

              color: selected.includes(index)
                ? "#ffffff"
                : "#000000",

              fontSize: "28px",
              fontWeight: "bold",
              cursor: "pointer",

              transition: "0.3s",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {bubble}
          </button>
        ))}
      </div>
    </div>
  );
}