import { useEffect, useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { getAnalytics, getExpenses } from '../services/api';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#ff8a80'];

export default function Charts() {
  const [analytics, setAnalytics] = useState(null);
  const [allExpenses, setAllExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, expensesRes] = await Promise.all([
          getAnalytics(),
          getExpenses()
        ]);
        
        setAnalytics(analyticsRes.data);
        setAllExpenses(expensesRes.data.expenses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  const pieDataMap = {};
  const barDataMap = {};

  allExpenses.forEach((e) => {
    pieDataMap[e.category] = (pieDataMap[e.category] || 0) + e.amount;
    
    const date = new Date(e.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    barDataMap[monthYear] = (barDataMap[monthYear] || 0) + e.amount;
  });

  const pieData = Object.entries(pieDataMap).map(([name, value]) => ({ name, value }));
  
  const barData = Object.entries(barDataMap)
    .map(([monthYear, amount]) => ({ monthYear, amount }))
    .sort((a, b) => {
      const dateA = new Date(a.monthYear);
      const dateB = new Date(b.monthYear);
      return dateA - dateB;
    });

    
  const monthlyTrendFormatted = analytics?.monthlyTrend?.map(item => ({
    ...item,
    monthYear: (() => {
      const [year, month] = item.month.split('-');
      const date = new Date(year, month - 1);
      return `${date.toLocaleString('default', { month: 'short' })} ${year}`;
    })()
  })) || [];

  return (
    <div className="charts-container">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="stat-value">₹{analytics?.totalAmount?.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Total Entries</h3>
          <p className="stat-value">{analytics?.totalExpenses}</p>
        </div>
      </div>

      <div className="charts-grid">
        {/* Category Distribution */}
        <div className="chart-card">
          <h3>💼 Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name" 
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Spending */}
        <div className="chart-card">
          <h3>📅 Monthly Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="monthYear" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend Line Chart */}
        <div className="chart-card">
          <h3>📈 Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendFormatted}>
              <XAxis dataKey="monthYear" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8884d8" 
                strokeWidth={3}
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 3 Categories This Month */}
        <div className="chart-card">
          <h3>🏆 Top 3 Categories This Month</h3>
          <div className="top-categories">
            {analytics?.topCategories?.map((cat, index) => (
              <div key={cat.category} className="category-item">
                <div className="category-rank">#{index + 1}</div>
                <div className="category-info">
                  <div className="category-name">{cat.category}</div>
                  <div className="category-amount">₹{cat.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}