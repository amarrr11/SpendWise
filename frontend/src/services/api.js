import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

export const getExpenses = () => API.get('/expenses');
export const getExpenseById = (id) => API.get(`/expenses/${id}`);
export const addExpense = (data) => API.post('/expenses', data);
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);


export const getAnalytics = () => API.get('/analytics');