import { deleteExpense } from '../services/api';

export default function ExpenseList({ expenses, fetchExpenses, setEditing }) {
  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="expense-list">
      <h3>📋 Recent Expenses</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e._id}>
              <td>₹{e.amount}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>{formatDate(e.date)}</td>
              <td>
                <button onClick={() => setEditing(e)} className="btn btn-sm btn-secondary">
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(e._id)} className="btn btn-sm btn-danger">
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}