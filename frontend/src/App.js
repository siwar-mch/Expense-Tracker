import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpensesList from "./pages/ExpensesList";
import AddIncome from "./pages/AddIncome";
import IncomeList from "./pages/IncomeList";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<AddExpense />} />
        <Route path="/expenses" element={<ExpensesList />} />

        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/income" element={<IncomeList />} />
      </Routes>
    </Router>
  );
}

export default App;
