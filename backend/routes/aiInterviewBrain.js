const express = require("express");
const router = express.Router();

// Simple dynamic interview engine

let interviewState = {
  startTime: null,
  questionsAsked: [],
  currentDifficulty: "medium"
};

const baseQuestions = [
  "Tell me about yourself.",
  "Explain your final year project.",
  "Why did you choose this technology for your project?",
  "What is Java?",
  "Explain polymorphism in Java.",
  "What is Spring Boot?",
  "What is REST API?",
  "Difference between SQL and NoSQL?",
  "What is dependency injection?"
];

function getFollowUp(answer) {
  if (!answer) return null;

  if (answer.toLowerCase().includes("spring")) {
    return "Why did you choose Spring Boot instead of Node.js?";
  }

  if (answer.toLowerCase().includes("java")) {
    return "What are the advantages of Java over other languages?";
  }

  if (answer.toLowerCase().includes("project")) {
    return "What challenges did you face during your project development?";
  }

  return null;
}

// Start Interview
router.post("/start", (req, res) => {
  interviewState.startTime = Date.now();
  interviewState.questionsAsked = [];
  interviewState.currentDifficulty = "medium";

  const firstQuestion = baseQuestions[0];
  interviewState.questionsAsked.push(firstQuestion);

  res.json({
    message: "Interview started",
    question: firstQuestion
  });
});

// Submit Answer
router.post("/answer", (req, res) => {
  const { answer } = req.body;

  const elapsed = (Date.now() - interviewState.startTime) / 1000;

  if (elapsed > 1800) {
    return res.json({
      message: "Interview finished",
      finished: true
    });
  }

  const followUp = getFollowUp(answer);

  if (followUp) {
    interviewState.questionsAsked.push(followUp);
    return res.json({
      question: followUp
    });
  }

  const nextIndex = interviewState.questionsAsked.length;

  if (nextIndex >= baseQuestions.length) {
    return res.json({
      message: "Interview finished",
      finished: true
    });
  }

  const nextQuestion = baseQuestions[nextIndex];
  interviewState.questionsAsked.push(nextQuestion);

  res.json({
    question: nextQuestion
  });
});

module.exports = router;
