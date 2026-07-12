const bcrypt = require("bcrypt");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const axios = require("axios");
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const googleAuth = require("./routes/googleAuth");

app.use("/api/auth/google", googleAuth);
/* -----------------------------
   AI INTERVIEW ROUTE
----------------------------- */

const aiInterview = require("./routes/aiInterview");
app.use("/api/interview", aiInterview);
/* -----------------------------
   AI INTERVIEW BRAIN
----------------------------- */

const aiInterviewBrain = require("./routes/aiInterviewBrain");
app.use("/api/brain", aiInterviewBrain);

/* -----------------------------
   File Upload Configuration
----------------------------- */

const upload = multer({
  dest: "uploads/"
});

/* -----------------------------
   Basic Test Route
----------------------------- */

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

/* -----------------------------
   Database Test
----------------------------- */

app.get("/api/test", async (req, res) => {
  try {

    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully",
      serverTime: result.rows[0].now
    });

  } catch (error) {

    console.error("DB Error:", error);

    res.status(500).json({
      message: "Database connection failed"
    });

  }
});

/* -----------------------------
   Register User
----------------------------- */

app.post("/api/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const newUser = await pool.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, password]
    );

    res.json(newUser.rows[0]);

  } catch (error) {

    console.error("Register Error:", error.message);

    res.status(500).json({
      message: "Registration failed"
    });

  }

});
 /* -----------------------------
   Login User
----------------------------- */

app.post("/api/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {

      return res.status(401).json({
        message: "Invalid email or password"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid email or password"
      });

    }

    res.json({
      message: "Login successful",
      user: user.rows[0]
    });

  } catch (error) {

    console.error("Login Error:", error.message);

    res.status(500).json({
      message: "Login failed"
    });

  }

});
/* -----------------------------
   Signup User
----------------------------- */

app.post("/api/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }
 const hashedPassword =
  await bcrypt.hash(password, 10);

await pool.query(
  `INSERT INTO users (name, email, password)
   VALUES ($1, $2, $3)`,
  [name, email, hashedPassword]
);

    res.json({
      message: "Account created successfully"
    });

  } catch (error) {

    console.error("Signup Error:", error.message);

    res.status(500).json({
      message: "Signup failed"
    });

  }

});
/* -----------------------------
   Forgot Password
----------------------------- */

app.post("/api/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "Email not found"
      });
    }

    const resetToken =
      Math.random().toString(36).substring(2, 15);

    await pool.query(
      `UPDATE users
       SET reset_token=$1
       WHERE email=$2`,
      [resetToken, email]
    );

    res.json({
      message: "Reset token generated",
      token: resetToken
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Forgot password failed"
    });

  }

});
/* -----------------------------
   Reset Password
----------------------------- */

app.post("/api/reset-password", async (req, res) => {

  try {

    const { email, newPassword } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {

      return res.status(404).json({
        message: "Email not found"
      });

    }

  const hashedPassword =
  await bcrypt.hash(newPassword, 10);

await pool.query(
  "UPDATE users SET password=$1 WHERE email=$2",
  [hashedPassword, email]
);

    res.json({
      message: "Password updated successfully"
    });

  } catch (error) {

    console.error("Reset Password Error:", error);

    res.status(500).json({
      message: "Reset password failed"
    });

  }

});
/* -----------------------------
   Get Student Profile
----------------------------- */

app.get("/api/profile/:email", async (req, res) => {

  try {

    const { email } = req.params;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.json(user.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to load profile"
    });

  }

});
 
/* -----------------------------
   Complete Profile
----------------------------- */

app.post("/api/complete-profile", async (req, res) => {

  try {

    const {
      email,
      phone,
      college,
      branch,
      graduationYear,
      favoriteLanguage,
      careerTrack,
      dreamCompany
    } = req.body;

    await pool.query(
      `UPDATE users
       SET
       phone = $1,
       college = $2,
       branch = $3,
       graduation_year = $4,
       favorite_language = $5,
       career_track = $6,
       dream_company = $7,
       profile_completed = true
       WHERE email = $8`,
      [
        phone,
        college,
        branch,
        graduationYear,
        favoriteLanguage,
        careerTrack,
        dreamCompany,
        email
      ]
    );

    res.json({
      message: "Profile saved successfully"
    });

  } catch (error) {

    console.error("Complete Profile Error:", error);

    res.status(500).json({
      message: "Profile save failed"
    });

  }

});
/* -----------------------------
   Get All Users
----------------------------- */

app.get("/api/users", async (req, res) => {

  try {

    const users = await pool.query("SELECT * FROM users");

    res.json(users.rows);

  } catch (error) {

    console.error("Users Fetch Error:", error.message);

    res.status(500).json({
      message: "Fetching users failed"
    });

  }

});

  /* ------------------------------------------------
   EXCEL QUESTION UPLOAD API (UPDATED)
------------------------------------------------ */

app.post("/api/upload-questions", upload.single("file"), async (req, res) => {

  console.log("UPLOAD API HIT");

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    console.log("Uploaded file:", req.file.path);

    // Read Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const questions = XLSX.utils.sheet_to_json(sheet, {
      defval: "",
      raw: false
    });

    console.log("Excel rows:", questions.length);

    if (questions.length === 0) {
      return res.status(400).json({
        message: "Excel file has no data"
      });
    }
    // 🔥 DELETE OLD DATA FIRST
  await pool.query(`
  DELETE FROM questions
  WHERE LOWER(TRIM(company)) = LOWER(TRIM($1))
  AND LOWER(TRIM(category)) = LOWER(TRIM($2))
`, [
  questions[0].company,
  questions[0].category
]);
    let inserted = 0;

    // 🔥 Insert questions
    for (let i = 0; i < questions.length; i++) {

      const q = questions[i];

      const company = q.company?.toString().trim();
      const category = q.category?.toString().trim();
      const question = q.question?.toString().trim();

      const optionA = q.option_a?.toString().trim() || null;
      const optionB = q.option_b?.toString().trim() || null;
      const optionC = q.option_c?.toString().trim() || null;
      const optionD = q.option_d?.toString().trim() || null;

      const correctAnswer = q.correct_answer?.toString().trim() || null;

      console.log("Processing row:", q);

      // 🔥 Skip empty rows
      if (!company || !category || !question) {
        console.log("❌ Skipped empty row");
        continue;
      }

      try {

         const result = await pool.query(
  `INSERT INTO questions
  (
    company,
    category,
    section,
    set_no,
    exam_type,
    difficulty,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer
  )
  VALUES
  ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
  RETURNING *`,
  [
    company,
    category,
    q.section?.toString().trim() || null,

    q.set_no?.toString().trim() || null,
    q.exam_type?.toString().trim() || null,
    q.difficulty?.toString().trim() || null,

    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
  ]
);

        console.log("✅ Inserted:", result.rows[0]);

        inserted++;

      } catch (err) {

        console.error("❌ Insert Error:", err.message);

      }

    }

    // delete uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({
      message: "Questions uploaded successfully",
      totalRows: questions.length,
      inserted: inserted
    });

  } catch (error) {

    console.error("Upload Error:", error);

    res.status(500).json({
      message: "Question upload failed",
      error: error.message
    });

  }

});

/* ------------------------------------------------
   CODING QUESTION UPLOAD API
------------------------------------------------ */

app.post(
  "/api/upload-coding-questions",
  upload.single("file"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded"
        });
      }

      const workbook = XLSX.readFile(req.file.path);

      const sheet =
        workbook.Sheets[workbook.SheetNames[0]];

      const questions =
        XLSX.utils.sheet_to_json(sheet, {
          defval: "",
          raw: false
        });
      // DELETE OLD CODING QUESTIONS FIRST
await pool.query(
`
DELETE FROM coding_questions
WHERE LOWER(TRIM(company)) = LOWER(TRIM($1))
`,
[
  questions[0].company
]
);
      let inserted = 0;

      for (const q of questions) {

        await pool.query(
          `INSERT INTO coding_questions
          (
            company,
            category,
            title,
            problem_statement,
            sample_input,
            sample_output,
            hidden_test_cases,
            difficulty
          )
          VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [
            q.company,
            q.category,
            q.title,
            q.problem_statement,
            q.sample_input,
            q.sample_output,
            q.hidden_test_cases,
            q.difficulty
          ]
        );

        inserted++;
      }

      fs.unlinkSync(req.file.path);

      res.json({
        message: "Coding questions uploaded successfully",
        inserted
      });

    }  catch (error) {

  console.error("CODING UPLOAD ERROR:", error);

  res.status(500).json({
    message: "Upload failed",
    error: error.message
  });

}

  }
);

/* ------------------------------------------------
   FETCH QUESTIONS API (NEW)
------------------------------------------------ */
app.get("/api/questions", async (req, res) => {
  try {
    const { company, category } = req.query;

    let query = `SELECT * FROM questions WHERE 1=1`;
    let values = [];

    if (company) {
      values.push(company);
      query += ` AND company = $${values.length}`;
    }

    if (category) {
      values.push(category);
      query += ` AND category = $${values.length}`;
    }

    const result = await pool.query(query, values);

    res.json({
      total: result.rows.length,
      questions: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch questions",
    });
  }
});
 
/* ------------------------------------------------
   SUBMIT TEST API   <-- ADD HERE
------------------------------------------------ */

app.post("/api/submit-test", async (req, res) => {

  try {

    const { user_id, answers } = req.body;

    let score = 0;

    for (const a of answers) {

      const question = await pool.query(
        "SELECT correct_answer, company FROM questions WHERE id=$1",
        [a.question_id]
      );

      const correct = question.rows[0].correct_answer;
      const company = question.rows[0].company;

      const isCorrect = correct === a.selected_answer;

      if (isCorrect) score++;

      await pool.query(
        `INSERT INTO test_results
        (user_id, company, question_id, selected_answer, correct_answer, is_correct)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          user_id,
          company,
          a.question_id,
          a.selected_answer,
          correct,
          isCorrect
        ]
      );

    }

    res.json({
      message: "Test submitted successfully",
      score: score,
      total: answers.length
    });

  } catch (error) {

    console.error("Submit Test Error:", error);

    res.status(500).json({
      message: "Test submission failed"
    });

  }

});
/* ------------------------------------------------
   GET USER TEST RESULTS
------------------------------------------------ */

app.get("/api/results/:user_id", async (req, res) => {

  try {

    const { user_id } = req.params;

    const result = await pool.query(
      "SELECT * FROM test_results WHERE user_id=$1 ORDER BY created_at DESC",
      [user_id]
    );

    res.json({
      total_attempts: result.rows.length,
      results: result.rows
    });

  } catch (error) {

    console.error("Results Fetch Error:", error);

    res.status(500).json({
      message: "Fetching results failed"
    });

  }

});
 
/* ------------------------------------------------
   CODE EXECUTION API
------------------------------------------------ */

app.post("/api/execute", async (req, res) => {

  try {

    const { language, code, input } = req.body;

    const languageMap = {
      java: 62,
      python: 71,
      javascript: 63,
      cpp: 54,
      c: 50
    };

    const response = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: languageMap[language],
        stdin: input || ""
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      run: {
        stdout: response.data.stdout,
        stderr: response.data.stderr
      }
    });

  } catch (error) {

    console.error("Execution Error:", error.message);

    res.status(500).json({
      message: "Execution failed"
    });

  }

});
/* ------------------------------------------------
   SAVE FINAL TEST RESULT
------------------------------------------------ */

app.post("/api/save-result", async (req, res) => {

  try {

    const { student_name, company, score } = req.body;

    await pool.query(
      `INSERT INTO student_results (student_name, company, score)
       VALUES ($1,$2,$3)`,
      [student_name, company, score]
    );

    res.json({
      message: "Result saved successfully"
    });

  } catch (error) {

    console.error("Save Result Error:", error);

    res.status(500).json({
      message: "Saving result failed"
    });

  }

});

/* ------------------------------------------------
   LEADERBOARD API
------------------------------------------------ */
 app.get("/api/leaderboard", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT student_name, company, score
      FROM student_results
      ORDER BY score DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error("Leaderboard Error:", error);

    res.status(500).json({
      message: "Fetching leaderboard failed"
    });

  }

});
/* ------------------------------------------------
   FETCH CODING QUESTIONS
------------------------------------------------ */

app.get("/api/coding-questions/:company", async (req, res) => {

  try {

    const { company } = req.params;

    const result = await pool.query(
      `SELECT * FROM coding_questions
       WHERE LOWER(company) = LOWER($1)
       ORDER BY id`,
      [company]
    );

    res.json(result.rows);

  } catch (error) {

    console.error("Coding Questions Fetch Error:", error);

    res.status(500).json({
      message: "Failed to fetch coding questions"
    });

  }

});
/* ------------------------------------------------
   START SERVER
------------------------------------------------ */

const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database Connected:", result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.message);
  }
});