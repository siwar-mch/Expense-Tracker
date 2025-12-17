const Income = require("../models/Income");

// add income (you already have this)
exports.addIncome = async (req, res) => {
  try {
    const income = new Income({
      amount: req.body.amount,
      source: req.body.source,
      date: req.body.date,
      user: req.user.id
    });
    await income.save();
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get incomes (you may already have this)
exports.getIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOne({ _id: req.params.id, user: req.user.id });
    if (!income) return res.status(404).json({ message: "Income not found" });

    await income.deleteOne(); // or income.remove()
    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
