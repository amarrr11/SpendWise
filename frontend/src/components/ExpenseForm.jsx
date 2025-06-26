import { useState, useEffect } from 'react';
import { addExpense, updateExpense } from '../services/api';

export default function ExpenseForm({ fetchExpenses, editing, setEditing }) {
  const [form, setForm] = useState({ amount: '', category: '', description: '', date: '' });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateExpense(editing._id, form);
      setEditing(null);
    } else {
      await addExpense(form);
    }
    setForm({ amount: '', category: '', description: '', date: '' });
    fetchExpenses();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <button type="submit">{editing ? 'Update' : 'Add'}</button>
    </form>
  );
}
