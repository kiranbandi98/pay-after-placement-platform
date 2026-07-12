const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Test Route
router.get("/", (req, res) => {
  res.json({
    message: "Google Authentication Route Working",
  });
});

// Google Login API
router.post("/", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const name = payload.name;
    const email = payload.email;
    const picture = payload.picture;

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // Existing User
    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];

      return res.json({
        success: true,
        isNewUser: false,
        user,
      });
    }
 // Create New User
const newUser = await pool.query(
  `INSERT INTO users
  (
    name,
    email,
    profile_completed
  )
  VALUES
  ($1, $2, false)
  RETURNING *`,
  [
    name,
    email
  ]
);

return res.json({
  success: true,
  isNewUser: true,
  user: newUser.rows[0],
});

  } catch (error) {
    console.error("Google Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Google token verification failed",
    });
  }
});

module.exports = router;