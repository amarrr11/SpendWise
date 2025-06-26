import { useEffect, useState } from 'react';
import { getExpenses } from './services/api';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Charts from './components/Charts';
import ExportButton from './components/ExportButton';
import { useTheme } from './context/ThemeContext';
import './styles/theme.css';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showCharts, setShowCharts] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleExpenseAdded = () => {
    fetchExpenses();
  };

  if (showCharts) {
    return (
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <div className="container">
          <div className="header">
            <h1>📊 Analytics Dashboard</h1>
            <div className="header-controls">
              <button onClick={() => setShowCharts(false)} className="btn btn-secondary">
                ← Back to Expenses
              </button>
              <button onClick={toggleTheme} className="theme-toggle">
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          <Charts />
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <div className="container">
        <div className="header">
          <h1>💰 SpendWise</h1>
          <div className="header-controls">
            <button onClick={() => setShowCharts(true)} className="btn btn-primary">
              📊 View Analytics
            </button>
            <ExportButton />
            <button onClick={toggleTheme} className="theme-toggle">
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        <ExpenseForm 
          fetchExpenses={handleExpenseAdded} 
          editing={editing} 
          setEditing={setEditing} 
        />
        
        <ExpenseList 
          expenses={expenses} 
          fetchExpenses={fetchExpenses} 
          setEditing={setEditing} 
        />
      </div>
    </div>
  );
}