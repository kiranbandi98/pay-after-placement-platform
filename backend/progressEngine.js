const db = require("./config/db");
async function updateModuleProgress(userId, companyId, moduleId) {

  console.log("Updating module progress...");

  // Find company_round_module_id
  const crm = await db.query(
    `
    SELECT crm.id
    FROM company_round_modules crm
    JOIN company_rounds cr
      ON crm.company_round_id = cr.id
    WHERE cr.company_id = $1
      AND crm.module_id = $2
    `,
    [companyId, moduleId]
  );

  if (crm.rows.length === 0) {
    console.log("Module not mapped.");
    return;
  }

  const companyRoundModuleId = crm.rows[0].id;

  // Total questions in this module
  const totalQuestions = await db.query(
    `
    SELECT COUNT(*) AS total
    FROM questions
    WHERE module_id = $1
    `,
    [moduleId]
  );

  const totalItems = Number(totalQuestions.rows[0].total);

  // Questions answered by this student
  const answered = await db.query(
    `
    SELECT COUNT(*) AS completed,
           SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) AS score
    FROM test_results
    WHERE user_id = $1
      AND module_id = $2
    `,
    [userId, moduleId]
  );

  const completedItems = Number(answered.rows[0].completed || 0);
  const score = Number(answered.rows[0].score || 0);

  const progress =
    totalItems === 0
      ? 0
      : (completedItems / totalItems) * 100;

  const completed = progress >= 100;

  // Insert or Update progress
  await db.query(
    `
    INSERT INTO student_module_progress
    (
      user_id,
      company_round_module_id,
      progress_percentage,
      is_completed,
      completed_items,
      total_items,
      score
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)

    ON CONFLICT (user_id, company_round_module_id)

    DO UPDATE SET
      progress_percentage = EXCLUDED.progress_percentage,
      is_completed = EXCLUDED.is_completed,
      completed_items = EXCLUDED.completed_items,
      total_items = EXCLUDED.total_items,
      score = EXCLUDED.score,
      last_updated = CURRENT_TIMESTAMP
    `,
    [
      userId,
      companyRoundModuleId,
      progress,
      completed,
      completedItems,
      totalItems,
      score
    ]
  );

  console.log("Module Progress Updated.");
}
module.exports = {
  updateModuleProgress
};