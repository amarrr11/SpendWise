const express = require('express');
const { Parser } = require('json2csv');
const Expense = require('../models/expense');
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getAnalytics
} = require('../controllers/expenseController');

const router = express.Router();

router.get('/export', async (req, res) => {
  try {
    const expenses = await Expense.find().lean();
    const fields = ['amount', 'category', 'description', 'date', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(expenses);

    res.header('Content-Type', 'text/csv');
    res.attachment('expenses.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analytics', getAnalytics);

router.post('/expenses', createExpense);
router.get('/expenses', getExpenses);
router.get('/expenses/:id', getExpenseById);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

module.exports = router;