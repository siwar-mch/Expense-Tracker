import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaTrash } from "react-icons/fa";

export default function ExpensesList() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setExpenses(res.data));
  }, [token]);

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(expenses.filter((exp) => exp._id !== id));
  };

  const filteredExpenses = expenses.filter((exp) => {
    if (!month) return true;
    return new Date(exp.date).getMonth() + 1 === Number(month);
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>My Expenses</h2>

        <select onChange={(e) => setMonth(e.target.value)}>
          <option value="">All months</option>
          {[...Array(12)].map((_, i) => (
            <option value={i + 1} key={i}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        {filteredExpenses.map((exp) => (
          <div
            className={`expense-card ${exp.category.toLowerCase()}`}
            key={exp._id}
          >
            <p>
              {exp.title} - {exp.amount} DT
            </p>
            <button onClick={() => deleteExpense(exp._id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
