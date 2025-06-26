const Expense = require('../models/expense');

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const expense = new Expense({ amount, category, description, date });
    await expense.save();
    
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .sort({ date: -1, createdAt: -1 });

    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;
    const updated = await Expense.findByIdAndUpdate(
      id, 
      { amount, category, description, date }, 
      { new: true }
    );
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    
    // Monthly trend data
    const monthlyData = {};
    const categoryData = {};
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const monthKey = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
      
      // Monthly trend
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      monthlyData[monthKey] += expense.amount;
      
      // Current month categories
      if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
        if (!categoryData[expense.category]) {
          categoryData[expense.category] = 0;
        }
        categoryData[expense.category] += expense.amount;
      }
    });
    
    // Sort monthly trend by date (oldest to newest)
    const monthlyTrend = Object.entries(monthlyData)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));
    
    const topCategories = Object.entries(categoryData)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
    
    res.json({
      monthlyTrend,
      topCategories,
      totalExpenses: expenses.length,
      totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createExpense, 
  getExpenses, 
  getExpenseById, 
  updateExpense, 
  deleteExpense,
  getAnalytics
};