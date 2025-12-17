const Expense = require("../models/Expense");

// Get expenses of logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    console.error("Get expenses error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const newExpense = new Expense({ ...req.body, user: req.user.id });
    await newExpense.save();
    res.json(newExpense);
  } catch (err) {
    console.error("Add expense error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete an expense (only owner can delete)
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.deleteOne(); // safe, not deprecated
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Delete expense error:", err);
    res.status(500).json({ message: err.message });
  }
};
