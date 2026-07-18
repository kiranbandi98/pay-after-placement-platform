const bcrypt = require("bcrypt");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const axios = require("axios");
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");
const progressEngine = require("./progressEngine");

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
const firstRow = questions[0];
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
       const moduleResult = await pool.query(
`
SELECT id
FROM modules
WHERE LOWER(module_name) = LOWER($1)
`,
[q.module_name?.toString().trim()]
);

if (moduleResult.rows.length === 0) {
  console.log("Module not found:", category);
  continue;
}

const moduleId = moduleResult.rows[0].id;
// Remove previous latest set
await pool.query(
  `
  UPDATE question_sets
  SET is_latest = FALSE
  WHERE company = $1
  AND module_id = $2
  `,
  [company, moduleId]
);

// Create or update current question set
await pool.query(
  `
  INSERT INTO question_sets
  (
      company,
      module_id,
      set_no,
      title,
      year,
      is_latest
  )
  VALUES
  ($1,$2,$3,$4,$5,TRUE)

  ON CONFLICT (company,module_id,set_no)

  DO UPDATE SET

      is_latest = TRUE,
      created_at = CURRENT_TIMESTAMP
  `,
  [
      company,
      moduleId,
      q.set_no,
      `${company.toUpperCase()} ${q.set_no.toUpperCase()} Practice Set`,
      new Date().getFullYear()
  ]
);

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
    correct_answer,
    module_id
  )
  VALUES
  ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
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
     moduleId
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
    const { company, category, set } = req.query;

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
    if (set) {
  values.push(set);
  query += ` AND set_no = $${values.length}`;
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
   SUBMIT TECHNICAL TEST API
------------------------------------------------ */
console.log("✅ submit-test route registered");

app.post("/api/submit-test", async (req, res) => {

  try {

    const { user_id, answers } = req.body;

    if (!user_id || !answers || answers.length === 0) {
      return res.status(400).json({
        message: "Invalid submission"
      });
    }

    let score = 0;
    let total_questions = answers.length;

    let company = "";
    let module_id = null;
    let set_no = "";

    for (const answer of answers) {

      const result = await pool.query(
        `
        SELECT
          company,
          module_id,
          set_no,
          correct_answer
        FROM questions
        WHERE id = $1
        `,
        [answer.question_id]
      );

      if (result.rows.length === 0) {
        continue;
      }

      const question = result.rows[0];

      company = question.company;
      module_id = question.module_id;
      set_no = question.set_no;
      console.log("Question ID:", answer.question_id);
      console.log("Student Answer:", answer.selected_answer);
      console.log("Correct Answer:", question.correct_answer);
      console.log("-------------------------");

      if (
        answer.selected_answer ===
        question.correct_answer
      ) {
        score++;
      }

    }
    
    const percentage = Number(
      ((score / total_questions) * 100).toFixed(2)
    );

    const status =
      percentage >= 70 ? "PASSED" : "FAILED";

    await pool.query(
      `
      INSERT INTO student_test_results
      (
        user_id,
        company,
        module_id,
        set_no,
        score,
        total_questions,
        percentage,
        status
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        user_id,
        company,
        module_id,
        set_no,
        score,
        total_questions,
        percentage,
        status
      ]
    );

    res.json({
      score,
      total: total_questions
    });

  } catch (error) {

    console.error("Technical Test Error:", error);

    res.status(500).json({
      message: "Technical test submission failed"
    });

  }

});
/* ------------------------------------------------
   SUBMIT CODING TEST API
------------------------------------------------ */

app.post("/api/submit-coding-test", async (req, res) => {

  try {

    const {
      user_id,
      company,
      module_id,
      set_no,
      score,
      total_questions
    } = req.body;

    const percentage = Number(
      ((score / total_questions) * 100).toFixed(2)
    );

    const status =
      percentage >= 70 ? "PASSED" : "FAILED";

    await pool.query(
      `
      INSERT INTO student_coding_results
      (
        user_id,
        company,
        module_id,
        set_no,
        score,
        total_questions,
        percentage,
        status
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        user_id,
        company,
        module_id,
        set_no,
        score,
        total_questions,
        percentage,
        status
      ]
    );

    res.json({
      message: "Coding result saved successfully",
      percentage,
      status
    });

  } catch (error) {

    console.error("Coding Result Error:", error);

    res.status(500).json({
      message: "Saving coding result failed"
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
   FETCH CODING QUESTIONS (Dynamic Sets)
------------------------------------------------ */

app.get("/api/coding-questions", async (req, res) => {

  try {

    const { company, set } = req.query;

    const result = await pool.query(
      `
      SELECT *
      FROM coding_questions
      WHERE LOWER(company) = LOWER($1)
      AND LOWER(set_no) = LOWER($2)
      ORDER BY id
      `,
      [
        company,
        set
      ]
    );

    res.json({
      questions: result.rows
    });

  } catch (error) {

    console.error("Coding Questions Fetch Error:", error);

    res.status(500).json({
      message: "Failed to fetch coding questions"
    });

  }

});
/* ----------------------------------------
   GET AVAILABLE QUESTION SETS
---------------------------------------- */

app.get("/api/question-sets", async (req, res) => {

  try {

    const { company, category } = req.query;

    const result = await pool.query(
      `
      SELECT DISTINCT set_no
      FROM questions
      WHERE company = $1
      AND category = $2
      ORDER BY set_no
      `,
      [company, category]
    );

    res.json({
      sets: result.rows
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to load sets"
    });

  }

});
/* ----------------------------------------
   GET AVAILABLE CODING SETS
---------------------------------------- */

app.get("/api/coding-question-sets", async (req, res) => {

  try {

    const { company } = req.query;

    const result = await pool.query(
      `
      SELECT DISTINCT set_no
      FROM coding_questions
      WHERE LOWER(company) = LOWER($1)
      ORDER BY set_no
      `,
      [company]
    );

    res.json({
      sets: result.rows
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to load coding sets"
    });

  }

});
/* ------------------------------------------------
   ROUND 2 PROGRESS API
------------------------------------------------ */

app.get("/api/progress/round2/:user_id", async (req, res) => {

  try {

    const { user_id } = req.params;

    // Total Technical Sets
    const totalTechnical = await pool.query(`
      SELECT COUNT(DISTINCT set_no) AS total
      FROM questions
      WHERE company='accenture'
      AND category='technical'
    `);

    // Completed Technical Sets
    const completedTechnical = await pool.query(`
      SELECT COUNT(DISTINCT set_no) AS completed
      FROM student_test_results
      WHERE user_id=$1
      AND company='accenture'
      AND status='PASSED'
    `,[user_id]);

    // Total Coding Sets
    const totalCoding = await pool.query(`
      SELECT COUNT(DISTINCT set_no) AS total
      FROM coding_questions
      WHERE company='accenture'
    `);

    // Completed Coding Sets
    const completedCoding = await pool.query(`
      SELECT COUNT(DISTINCT set_no) AS completed
      FROM student_coding_results
      WHERE user_id=$1
      AND company='accenture'
      AND status='PASSED'
    `,[user_id]);

    const technicalTotal =
      Number(totalTechnical.rows[0].total);

    const technicalCompleted =
      Number(completedTechnical.rows[0].completed);

    const codingTotal =
      Number(totalCoding.rows[0].total);

    const codingCompleted =
      Number(completedCoding.rows[0].completed);

    const technicalProgress =
      technicalTotal === 0
      ? 0
      : Math.round(
          (technicalCompleted / technicalTotal) * 100
        );

    const codingProgress =
      codingTotal === 0
      ? 0
      : Math.round(
          (codingCompleted / codingTotal) * 100
        );

    const round2Progress =
  Math.round(
    (technicalProgress + codingProgress) / 2
  );

  const technicalRoundCompleted =
  technicalProgress === 100;

const codingRoundCompleted =
  codingProgress === 100;

 let dashboardRound2 = 0;

if (technicalRoundCompleted) {
  dashboardRound2 += 50;
}

if (codingRoundCompleted) {
  dashboardRound2 += 50;
}

     res.json({

  // Assessment Page
  technicalProgress,
  codingProgress,
  round2Progress,

  technicalCompleted,
  technicalTotal,

  codingCompleted,
  codingTotal,

  // Dashboard
  technicalRoundCompleted,
  codingRoundCompleted,
  dashboardRound2

});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Progress loading failed"
    });

  }

});
 /* ------------------------------------------------
   EXECUTE CODE (Piston)
------------------------------------------------ */

app.post("/api/execute", async (req, res) => {

  try {

    const { source_code, language, stdin } = req.body;

    const languageMap = {
      java: "java",
      python: "python3",
      cpp: "cpp",
      c: "c"
    };

    const pistonLanguage = languageMap[language];

    if (!pistonLanguage) {
      return res.status(400).json({
        message: "Unsupported language"
      });
    }

    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: pistonLanguage,
        version: "*",
        files: [
          {
            content: source_code
          }
        ],
        stdin: stdin || ""
      }
    );

    return res.json({
      stdout: response.data.run.stdout,
      stderr: response.data.run.stderr,
      compile_output: response.data.compile?.stderr || "",
      status: response.data.run.code === 0 ? "Accepted" : "Error"
    });

  } catch (error) {

    console.error("Execute Error:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Code execution failed"
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