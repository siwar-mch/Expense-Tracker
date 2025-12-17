const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require("../controllers/expenseController");

// GET: get expenses of logged-in user
router.get("/", auth, getExpenses);

// POST: create a new expense
router.post("/", auth, addExpense);

// DELETE: delete expense (only owner)
router.delete("/:id", auth, deleteExpense);

module.exports = router;