"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodingRound() {

  const router = useRouter();
 const selectedSet = "set1";
  const [questions, setQuestions] = useState<any[]>([]);
  

  useEffect(() => {

   const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "/login";
    return;
  }

  axios
  .get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/coding-questions?company=accenture&set=${selectedSet}`
  )
    .then((res) => {
  setQuestions(res.data.questions);
  console.log("Coding Questions:", res.data.questions);
})
    .catch((err) => {
      console.error("Error loading coding questions:", err);
    });
}, [selectedSet]);

  const [current, setCurrent] = useState(0);
  const [codeText, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("java");
  const [submitted, setSubmitted] = useState(false);
  const [answered, setAnswered] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);

  const [codes, setCodes] = useState<string[]>([
    "// Write your code here",
    "// Write your code here",
    "// Write your code here",
    "// Write your code here"
  ]);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {
          clearInterval(timer);
          alert("Time is over. Test submitted automatically.");
          setSubmitted(true);
          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  useEffect(() => {
    setCode(codes[current]);
  }, [current]);
  console.log("Questions State:", questions);
if (questions.length === 0) {
  return <h2>Loading coding questions...</h2>;
}
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const executeCode = async (input: string) => {

    try {

      const response = await axios.post(
       "https://pay-after-placement-platform.onrender.com/api/execute",
        {
  language: language,
  source_code: codeText,
  stdin: input
}
      );

      const result =
  response.data.stdout?.trim() ||
  response.data.stderr?.trim() ||
  response.data.compile_output?.trim() ||
  "No output";
      return result;

    } catch (error) {

      console.error(error);
      return "Execution server error";

    }

  };

  const runCode = async () => {

    if (!codeText.trim()) {
      setOutput("Please write code first.");
      return;
    }

    setOutput("Running code...");

    const sampleInput = questions[current]?.sample_input || "";
const sampleOutput = questions[current]?.sample_output || "";

    const userOutput = await executeCode(sampleInput);

    const expectedOutput = sampleOutput.trim();

    if (userOutput === expectedOutput) {

      setOutput(
        "Sample Test Case Passed\n\nOutput:\n" + userOutput
      );

    } else {

      setOutput(
        "Sample Test Case Failed\n\nYour Output:\n" +
        userOutput +
        "\n\nExpected Output:\n" +
        expectedOutput
      );

    }

  };

  const submitCode = async () => {

    setOutput("Submitting code and running hidden test cases...");

    const hiddenTests =
  JSON.parse(questions[current]?.hidden_test_cases || "[]");

    let passed = 0;

    let resultLog = "";

    for (let i = 0; i < hiddenTests.length; i++) {

      const test = hiddenTests[i];

      const userOutput = await executeCode(test.input);

      if (userOutput === test.expected.trim()) {

        passed++;

        resultLog += "Hidden Test Case " + (i + 1) + " : Passed\n";

      } else {

        resultLog += "Hidden Test Case " + (i + 1) + " : Failed\n";

      }

    }

    const updatedScores = [...scores];
    updatedScores[current] = passed;
    setScores(updatedScores);

    if (!answered.includes(current)) {

      setAnswered([...answered, current]);

    }

    setSubmitted(true);

    resultLog += "\nResult: Passed " + passed + " / " + hiddenTests.length;

    setOutput(resultLog);

  };

  const nextQuestion = () => {
if (!submitted) {
  alert("Please submit code before moving to the next question.");
  return;
}
    if (current < questions.length - 1) {

      setCurrent(current + 1);
      setOutput("");
      setSubmitted(false);

     } else {

  const total = scores.reduce((a, b) => a + b, 0);

  setOutput(
    "All questions completed. Redirecting to results..."
  );

  localStorage.setItem("coding_scores", JSON.stringify(scores));
  localStorage.setItem("coding_total", String(total));

  localStorage.setItem("codingCompany", "Accenture");
  localStorage.setItem("codingSet", "SET1");

  const userId = localStorage.getItem("userId");

  fetch("https://pay-after-placement-platform.onrender.com/api/submit-coding-test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: Number(userId),
      company: "accenture",
      module_id: 7,
      set_no: "set1",
      score: total,
      total_questions: questions.length,
    }),
  })
    .then(() => {
      setTimeout(() => {
        router.push("/accenture/coding/result");
      }, 1500);
    })
    .catch((err) => {
      console.error("Coding Result Save Error:", err);
      alert("Failed to save coding result.");
    });

}

  };

  return (

    <main style={{ padding: "20px", fontFamily: "Arial" }}>

      <h1>Accenture Coding Round</h1>

      <h2 style={{ color: "red" }}>
        Time Remaining: {minutes}:{seconds < 10 ? "0" : ""}{seconds}
      </h2>

      <h3>Question {current + 1} / {questions.length}</h3>

      <div style={{ display: "flex", gap: "20px" }}>

        <div style={{ width: "40%" }}>

          <h3>Problem</h3>
          <p>{questions[current].problem_statement}</p>

          <h3>Sample Test Case</h3>

          <div style={{ background: "#f5f5f5", padding: "10px", marginBottom: "20px" }}>
            <p><b>Input:</b></p>
            <p>{questions[current].sample_input || "No input"}</p>

            <p><b>Expected Output:</b></p>
            <p>{questions[current].sample_output}</p>
          </div>

          <h3>Select Language</h3>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: "8px", marginBottom: "20px" }}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>

        </div>

        <div style={{ width: "60%" }}>

          <h3>Code Editor</h3>

          <Editor
            height="400px"
            language={language}
            theme="vs-dark"
            value={codeText}
            onChange={(value) => {

              const v = value || "";

              setCode(v);

              const updatedCodes = [...codes];

              updatedCodes[current] = v;

              setCodes(updatedCodes);

            }}
          />

          <br />

          <button
            onClick={runCode}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            Run Code
          </button>

          <button
            onClick={submitCode}
            style={{
              padding: "10px 20px",
              background: "orange",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            Submit Code
          </button>

          <button
            onClick={nextQuestion}
            style={{
              padding: "10px 20px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Next Question
          </button>

          <h3 style={{ marginTop: "20px" }}>Output</h3>

          <div
            style={{
              background: "#eee",
              padding: "15px",
              minHeight: "50px",
              marginTop: "10px",
              whiteSpace: "pre-line"
            }}
          >
            {output}
          </div>

        </div>

      </div>

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
                : "lightgray",
              color: "white",
              border: "none"
            }}
          >
            {index + 1}
          </button>

        ))}

      </div>

    </main>

  );

}