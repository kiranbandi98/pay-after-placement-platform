const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const pool = require("../config/db"); // ✅ NEW
require("dotenv").config();

/* -----------------------------------------
   OPENAI SETUP
------------------------------------------ */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* -----------------------------------------
   INTERVIEW STATE
------------------------------------------ */

let interviewState = {
  roundIndex: 0,
  questionIndex: 0,
  score: 0,
  total: 0,
  mode: "normal",
  company: "",
  resume: "",
  isFollowUp: false,
  lastQuestion: "",
  questions: [] // ✅ NEW (DB questions)
};

/* -----------------------------------------
   START INTERVIEW
------------------------------------------ */

router.post("/start", async (req, res) => {

  try {

    const { mode, resume, company } = req.body;

    interviewState = {
      roundIndex: 0,
      questionIndex: 0,
      score: 0,
      total: 0,
      mode: mode || "normal",
      company: company || "",
      resume: resume || "",
      isFollowUp: false,
      lastQuestion: "",
      questions: []
    };

    // 🔥 COMPANY MODE START (DB)
    if (mode === "company") {

      const result = await pool.query(
        `SELECT * FROM questions WHERE company=$1 ORDER BY id ASC`,
        [company]
      );

      const questions = result.rows;

      if (questions.length === 0) {
        return res.json({
          message: "No questions found"
        });
      }

       // 🔥 SPLIT QUESTIONS BY CATEGORY
interviewState = {
  ...interviewState,
  aptitude: questions.filter(q => q.category === "aptitude"),
  coding: questions.filter(q => q.category === "coding"),
  interview: questions.filter(q => q.category === "interview"),
  currentSection: "aptitude",
  questionIndex: 0,
  score: 0
};

// 👉 FIRST QUESTION (APTITUDE)
const firstQ = interviewState.aptitude[0];

return res.json({
  message: "Company interview started",
  question: firstQ?.question || "No aptitude questions",
  category: "aptitude"
});
    }

    // 🔥 NORMAL MODE START
    return res.json({
      message: "Interview started",
      question: "Tell me about yourself"
    });

  } catch (error) {

    console.error("Start Error:", error);

    res.status(500).json({
      message: "Interview start failed"
    });

  }

});

/* -----------------------------------------
   NEXT QUESTION
------------------------------------------ */

router.post("/next", async (req, res) => {

  try {

    const { answer } = req.body;

    interviewState.total++;

    /* =====================================================
       🔥 COMPANY MODE WITH FOLLOW-UP (DB BASED)
    ===================================================== */
    if (interviewState.mode === "company") {

  const section = interviewState.currentSection;
  let currentList = interviewState[section];

  // 👉 MOVE NEXT
  interviewState.questionIndex++;

  // 🔥 SWITCH SECTION
  if (interviewState.questionIndex >= currentList.length) {

    if (section === "aptitude") {
      interviewState.currentSection = "coding";
      interviewState.questionIndex = 0;
    } 
    else if (section === "coding") {
      interviewState.currentSection = "interview";
      interviewState.questionIndex = 0;
    } 
    else {
      return res.json({
        completed: true,
        score: interviewState.score
      });
    }

    currentList = interviewState[interviewState.currentSection];
  }

  const currentQ = currentList[interviewState.questionIndex];

  // 🔥 INTERVIEW (FOLLOW-UP)
  if (interviewState.currentSection === "interview") {

    if (!interviewState.isFollowUp) {

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Generate follow-up question" },
          { role: "user", content: answer }
        ]
      });

      const followUp = aiResponse.choices[0].message.content;

      interviewState.isFollowUp = true;
      interviewState.lastQuestion = followUp;

      return res.json({
        completed: false,
        nextQuestion: followUp,
        category: "interview",
        isFollowUp: true
      });
    }

    interviewState.isFollowUp = false;
  }

  return res.json({
    completed: false,
    nextQuestion: currentQ?.question || "Done",
    category: interviewState.currentSection,
    isFollowUp: false
  });
}
     
    /* =====================================================
       🔥 NORMAL MODE (UNCHANGED)
    ===================================================== */

    let parsed;

    try {

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a professional interviewer.

Evaluate answer and ask next question.

Return JSON:
{
  "score": number,
  "feedback": "text",
  "nextQuestion": "text"
}
`
          },
          {
            role: "user",
            content: answer
          }
        ]
      });

      let text = aiResponse.choices[0].message.content;
      text = text.replace(/```json|```/g, "").trim();

      parsed = JSON.parse(text);

    } catch (err) {

      parsed = {
        score: 5,
        feedback: "Good attempt",
        nextQuestion: "Explain your project"
      };
    }

    interviewState.score += parsed.score;

    res.json({
      completed: false,
      nextQuestion: parsed.nextQuestion,
      marks: parsed.score,
      feedback: parsed.feedback
    });

  } catch (error) {

    console.error("Next Error:", error);

    res.status(500).json({
      message: "Interview failed",
      error: error.message
    });

  }

});

module.exports = router;