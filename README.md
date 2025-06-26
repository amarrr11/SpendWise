# 💰 SpendWise

A modern, full-featured expense tracking application built with React and Node.js. Track your expenses, visualize spending patterns, and export your data with ease.

## ✨ Features

### 📊 **Analytics Dashboard**
- **Category Distribution**: Pie chart showing expense breakdown by category
- **Monthly Spending**: Bar chart displaying monthly expense patterns with month and year
- **Spending Trend**: Line chart showing expense trends over time (chronologically sorted)
- **Top Categories**: View top 3 spending categories for current month

### 📋 **Expense Management**
- Add, edit, and delete expenses
- Categorize expenses for better organization
- Date-based expense tracking (DD-MM-YYYY format)
- All expenses displayed (no pagination)
- Most recent expenses displayed first

### 📥 **Data Export**
- Export all expense data to CSV/Excel format
- Complete transaction history download
- Easy data backup and analysis

### 🌗 **Dark Mode**
- Toggle between light and dark themes
- Persistent theme preference
- Eye-friendly interface for all lighting conditions

### 📝 **Request Logging**
- Comprehensive request logging using Morgan middleware
- All HTTP requests logged to file system
- Console logging for development
- Automatic log file management

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Modern, clean UI/UX

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spendwise
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/spendwise
   PORT=5000
   ```
   
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 🏗️ Project Structure

```
spendwise/
├── backend/
│   ├── controllers/
│   │   └── expenseController.js
│   ├── models/
│   │   └── expense.js
│   ├── routes/
│   │   └── expenseRoutes.js
│   ├── config/
│   │   └── db.js
│   ├── logs/
│   │   └── access.log (auto-generated)
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── ExportButton.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── theme.css
│   │   ├── app.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Analytics
- `GET /api/analytics` - Get analytics data

### Export
- `GET /api/export` - Export expenses to CSV

## 🎨 Customization

### Adding New Categories
Categories are dynamically created when adding expenses. Simply enter a new category name when creating an expense.

### Modifying Charts
Charts are built using Recharts. You can customize colors, add new chart types, or modify existing visualizations in the `Charts.jsx` component.

### Theme Customization
Modify CSS variables in `theme.css` to customize colors, spacing, and other design elements for both light and dark themes.

## 📊 Data Models

### Expense
```javascript
{
  amount: Number,
  category: String,
  description: String,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- Input validation and sanitization
- Morgan middleware for request logging
- Error handling and user feedback
- Secure API endpoints

## 📝 Logging

The application uses Morgan middleware for comprehensive request logging:
- All HTTP requests are logged to `backend/logs/access.log`
- Console logging for development environment
- Combined log format includes IP, timestamp, method, URL, status, and user agent
- Automatic log file creation and management

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages
3. Update API URL in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- Large datasets may affect chart performance
- CSV export includes all data (no filtering options yet)

## 🔮 Future Enhancements

- [ ] Multi-user support with authentication
- [ ] Receipt image uploads
- [ ] Recurring expense templates
- [ ] Advanced filtering and search
- [ ] Mobile app version
- [ ] Integration with banking APIs
- [ ] Log file rotation and archiving

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using React, Node.js, MongoDB, and Morgan**