"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function InterviewSessionContent() {

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "normal";
  const company = searchParams.get("company") || "";

  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [listening, setListening] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [roundName, setRoundName] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [timeLeft, setTimeLeft] = useState(1800);
  const [started, setStarted] = useState(false);

  const [antiCheatEnabled] = useState(true);

  const [resumeText, setResumeText] = useState("");
  const [isFollowUp, setIsFollowUp] = useState(false);

  const [difficulty, setDifficulty] = useState("very_easy");

  // 🔥 NEW: CATEGORY STATE
  const [category, setCategory] = useState("");

  /* ----------------------------- TIMER ----------------------------- */

  useEffect(() => {

    if (!started) return;

    if (timeLeft <= 0) {
      setStatus("⏰ Time Over! Interview Ended");
      speak("Time over. Interview completed.");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [started, timeLeft]);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function speak(text: string) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  }

  /* ----------------------------- START ----------------------------- */

  async function startInterview() {

    // ❌ Only require resume for normal mode
    if (mode === "normal" && !resumeText.trim()) {
      alert("Please paste your resume before starting interview");
      return;
    }

    setStarted(true);
    setIsFollowUp(false);

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    const res = await fetch("https://pay-after-placement-platform-1.onrender.com/api/interview/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mode: mode,
        resume: resumeText,
        company: company,
        difficulty: difficulty
      })
    });

    const data = await res.json();

    setQuestion(data.question);
    setCategory(data.category || ""); // 🔥 IMPORTANT

    setQuestionNumber(data.questionNumber);
    setTotalQuestions(data.totalQuestions);

    speak(data.question);

    setTimeout(() => {
      startListeningAuto();
    }, 2000);
  }

  /* ----------------------------- TAB SWITCH ----------------------------- */

  useEffect(() => {

    if (!antiCheatEnabled || !started) return;

    const handleViolation = () => {
      setStatus("❌ Interview terminated due to tab switching");
      speak("Interview terminated due to tab switching");
      setStarted(false);
    };

    window.addEventListener("blur", handleViolation);

    return () => {
      window.removeEventListener("blur", handleViolation);
    };

  }, [antiCheatEnabled, started]);

  /* ----------------------------- FULLSCREEN ----------------------------- */

  useEffect(() => {

    if (!antiCheatEnabled) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && started) {
        setStatus("❌ Fullscreen exited - Interview terminated");
        setStarted(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };

  }, [antiCheatEnabled, started]);

  /* ----------------------------- SEND ANSWER ----------------------------- */

  async function sendAnswer(answer: string) {

    if (!answer || answer.trim() === "") return;

    const res = await fetch("https://pay-after-placement-platform-1.onrender.com/api/interview/next", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ answer })
    });

    const data = await res.json();

    setCurrentAnswer("");

    if (data.completed) {

      localStorage.setItem("interview_score", data.score);

      setStatus(`Interview Completed | Score: ${data.score}`);
      speak("Interview completed. Thank you.");

      window.location.href = "/interview/result";
      return;
    }

    setIsFollowUp(data.isFollowUp || false);

    setQuestion(data.nextQuestion);
    setCategory(data.category || ""); // 🔥 IMPORTANT

    speak(data.nextQuestion);

    setTimeout(() => {
      startListeningAuto();
    }, 2000);
  }

  /* ----------------------------- AUTO RECORD ----------------------------- */

  function startListeningAuto() {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    let finalTranscript = "";
    let silenceTimer: any;

    setListening(true);

    recognition.onresult = (event: any) => {

      const transcript = event.results[0][0].transcript;

      finalTranscript += " " + transcript;

      setCurrentAnswer(finalTranscript);

      clearTimeout(silenceTimer);

      silenceTimer = setTimeout(() => {

        recognition.stop();
        setListening(false);

        sendAnswer(finalTranscript);

      }, 2000);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  }

  /* ----------------------------- UI ----------------------------- */

  return (

    <div style={{ padding: "40px" }}>

      <h2>AI Interview Session</h2>

      {!started && (
        <>
          {/* 🔥 Only show resume in normal mode */}
          {mode === "normal" && (
            <textarea
              placeholder="Paste your resume here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              style={{
                width: "100%",
                height: "150px",
                marginBottom: "20px",
                padding: "10px"
              }}
            />
          )}

          {mode === "normal" && (
            <>
              <h4>Select Difficulty</h4>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{ padding: "10px", marginBottom: "20px" }}
              >
                <option value="very_easy">Very Easy</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="very_hard">Very Hard</option>
              </select>
            </>
          )}
        </>
      )}

      {started && (
        <h3 style={{ color: timeLeft < 60 ? "red" : "green" }}>
          ⏳ Time Left: {formatTime(timeLeft)}
        </h3>
      )}

      <button onClick={startInterview}>
        Start Interview
      </button>

      <br /><br />

      {started && (
        <>
          {/* 🔥 NEW: CATEGORY DISPLAY */}
          <h3>Section: {category}</h3>

          <h4>
            {isFollowUp ? "🔁 Follow-up Question" : "📌 Main Question"}
          </h4>

          <h3>{question}</h3>
        </>
      )}

      <h3 style={{ color: listening ? "red" : "black" }}>
        {listening ? "🎤 Listening..." : ""}
      </h3>

      <button
        onClick={() => sendAnswer(currentAnswer)}
        disabled={!currentAnswer}
      >
        Next Question
      </button>

      <br /><br />

      <h3>{status}</h3>

    </div>
  );
}

export default function InterviewSession() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewSessionContent />
    </Suspense>
  );
}