const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, incomeController.addIncome);
router.get("/", authMiddleware, incomeController.getIncome);
router.delete("/:id", authMiddleware, incomeController.deleteIncome);

module.exports = router;
