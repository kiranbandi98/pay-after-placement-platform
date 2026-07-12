const express = require("express");
const router = express.Router();
const multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const db = require("../database");

console.log("QUESTION UPLOAD ROUTE FILE LOADED");

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Allow only Excel files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".xlsx", ".xls"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post("/upload-questions", upload.single("file"), async (req, res) => {
  console.log("🚀 Upload API HIT");
  try {
    // ✅ DB CONNECTION TEST
    const test = await db.query("SELECT NOW()");
    console.log("✅ DB CONNECTED:", test.rows[0]);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📂 Uploaded file:", req.file.path);

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const questions = XLSX.utils.sheet_to_json(sheet, {
      defval: "",
      raw: false,
    });

    console.log("📊 Excel rows:", questions.length);

    let inserted = 0;

    // 🔥🔥🔥 FINAL DELETE FIX (STRONG DELETE)
    const del = await db.query(
      `DELETE FROM questions 
       WHERE LOWER(category) LIKE '%behavioral%'`
    );

    console.log("🧹 Deleted rows:", del.rowCount);

    // ✅ INSERT NEW DATA
    for (let rawRow of questions) {
      const row = {};

      Object.keys(rawRow).forEach((key) => {
        row[key.trim().toLowerCase()] = rawRow[key];
      });
      console.log(row);

      const company = row.company?.toString().trim();
      const category = row.category?.toString().trim();
      const moduleName = row.module_name?.toString().trim();
      console.log("Module Name from Excel:", moduleName);
      console.log("Complete Row:", row);
      let moduleId = null;

if (moduleName) {
  const moduleResult = await db.query(
    "SELECT id FROM modules WHERE LOWER(module_name)=LOWER($1)",

    [moduleName]
  );
  console.log("Module Query Result:", moduleResult.rows);

  if (moduleResult.rows.length > 0) {
    moduleId = moduleResult.rows[0].id;
  }
}
      const question = row.question?.toString().trim();


      const optionA = row.option_a?.toString().trim() || null;
      const optionB = row.option_b?.toString().trim() || null;
      const optionC = row.option_c?.toString().trim() || null;
      const optionD = row.option_d?.toString().trim() || null;

      const correctAnswer =
        row.correct_answer?.toString().trim() || null;

      // ❌ Skip invalid rows
      if (!company || !category || !question) {
        console.log("❌ Skipped row:", row);
        continue;
      }

      try {
        const insertedQuestion = await db.query(
  `
  INSERT INTO questions
  (
    company,
    category,
    module_id,
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
  ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
  RETURNING *
  `,
  [
    company,
    category,
    moduleId,
    row.section || null,

 row["set_no"] ? row["set_no"].toString().trim() : null,
row["exam_type"] ? row["exam_type"].toString().trim() : null,
row["difficulty"] ? row["difficulty"].toString().trim() : null,

    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
  ]
);

console.log("✅ Inserted:", insertedQuestion.rows[0]);
         

        inserted++;
      } catch (err) {
        console.error("❌ INSERT ERROR:", err.message);
      }
    }

    res.json({
      message: "Questions uploaded successfully",
      totalRows: questions.length,
      inserted: inserted,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error);

    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
}); //these we are updated after to many confuions
//// here to below if want you delete it 

router.get("/all", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM questions");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching questions" });
  }
});
/////// here 
module.exports = router;