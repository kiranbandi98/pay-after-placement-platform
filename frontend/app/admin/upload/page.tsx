"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  async function uploadFile() {
    if (!file) {
      alert("Please select an Excel file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Default API (Technical + Behavioral)
    let apiUrl =
      "https://pay-after-placement-platform-1.onrender.com/api/upload-questions";

    // Coding Excel goes to coding API
    if (file.name.toLowerCase().includes("coding")) {
      apiUrl =
        "https://pay-after-placement-platform-1.onrender.com/api/upload-coding-questions";
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Questions uploaded successfully");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Server error while uploading");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Upload Questions</h1>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload Excel
      </button>
    </div>
  );
}