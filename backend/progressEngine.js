const pool = require("../config/db");

/**
 * Update Module Progress
 */
async function updateModuleProgress(userId, companyRoundModuleId) {
  console.log("Updating module progress...");
}

/**
 * Calculate Round Progress
 */
async function calculateRoundProgress(userId, companyRoundId) {
  console.log("Calculating round progress...");
}

/**
 * Calculate Company Progress
 */
async function calculateCompanyProgress(userId, companyId) {
  console.log("Calculating company progress...");
}

/**
 * Get Student Progress
 */
async function getStudentProgress(userId, companyId) {
  console.log("Fetching student progress...");
}

module.exports = {
  updateModuleProgress,
  calculateRoundProgress,
  calculateCompanyProgress,
  getStudentProgress,
};