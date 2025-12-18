"# Expense-Tracker" 
# Expense Tracker

A **full-stack web application** to manage personal incomes and expenses, track spending trends, and visualize monthly expenses. Built with **React** for the frontend and **Node.js/Express + MongoDB** for the backend.  

---

## Features

- User authentication with JWT
- Add, view, and delete expenses
- Filter expenses by month
- Expense categories for easy tracking
- Secure routes ensuring users can only access their own data

---

## Technology Stack

- **Frontend:** React, Axios, React Icons  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Authentication:** JSON Web Tokens (JWT)  
- **Styling:** CSS (custom)

---

## System Architecture


- Frontend communicates with backend via **REST API**
- Backend handles authentication, CRUD operations, and user-specific data
- MongoDB stores expenses linked to users

---

## API Endpoints

| Method | Endpoint           | Description                       | Auth Required |
|--------|------------------|-----------------------------------|---------------|
| GET    | /api/expenses     | Get all expenses for the user     | Yes           |
| POST   | /api/expenses     | Add a new expense                 | Yes           |
| DELETE | /api/expenses/:id | Delete an expense (owner only)    | Yes           |

---

## Frontend & Backend Integration

### Authentication Flow
1. User logs in / signs up → backend returns JWT
2. JWT stored in `localStorage`
3. Axios sends JWT in `Authorization` header for protected routes
4. Backend verifies token using `auth` middleware

### Example Axios Request

```javascript
axios.get("http://localhost:5000/api/expenses", {
  headers: { Authorization: `Bearer ${token}` }
});
expense-tracker/
├─ backend/
│  ├─ controllers/
│  │  └─ expenseController.js
│  ├─ models/
│  │  └─ Expense.js
│  ├─ routes/
│  │  └─ expenseRoute.js
│  ├─ middleware/
│  │  └─ auth.js
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ pages/
│  │  │  └─ ExpensesList.jsx
│  │  ├─ components/
│  │  │  └─ Navbar.jsx
│  │  └─ App.js
│  └─ package.json
└─ README.md
