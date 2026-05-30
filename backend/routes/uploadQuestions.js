const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");

const upload = multer({ dest: "uploads/" });

let questionBank = [];

router.post("/upload-questions", upload.single("file"), (req, res) => {

  const workbook = xlsx.readFile(req.file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  questionBank = data;

  res.json({
    message: "Questions uploaded successfully",
    total: questionBank.length
  });

});

router.get("/questions", (req, res) => {
  res.json(questionBank);
});

module.exports = router;