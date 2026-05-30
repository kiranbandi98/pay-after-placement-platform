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

    try {

      const res = await fetch("http://localhost:5000/api/upload-questions", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        alert("Questions uploaded successfully");
      } else {
        alert("Upload failed");
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

      <br /><br />

      <button onClick={uploadFile}>
        Upload Excel
      </button>

    </div>

  );

}