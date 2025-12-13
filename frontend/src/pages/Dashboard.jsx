import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

export default function Dashboard() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [month, setMonth] = useState("");
  const token = localStorage.getItem("token");

  // Fetch expenses
  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setExpenses(res.data));
  }, [token]);

  // Fetch income
  useEffect(() => {
    axios.get("http://localhost:5000/api/income", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setIncome(res.data));
  }, [token]);

  // Filter by selected month
  const filteredExpenses = expenses.filter(
    exp => !month || new Date(exp.date).getMonth() + 1 === Number(month)
  );
  const filteredIncome = income.filter(
    inc => !month || new Date(inc.date).getMonth() + 1 === Number(month)
  );

  // Totals
  const totalExpenses = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount), 0
  );
  const totalIncome = filteredIncome.reduce(
    (sum, inc) => sum + Number(inc.amount), 0
  );

  // balance
  const balance = totalIncome - totalExpenses;

  // Expenses by category
  const categoryData = Object.values(
    filteredExpenses.reduce((acc, exp) => {
      if (!acc[exp.category]) acc[exp.category] = { name: exp.category, value: 0 };
      acc[exp.category].value += Number(exp.amount);
      return acc;
    }, {})
  );

  // Income by source
  const incomeData = Object.values(
    filteredIncome.reduce((acc, inc) => {
      const key = inc.source.toLowerCase().replace(/ /g, "-");
      if (!acc[key]) acc[key] = { name: inc.source, value: 0 };
      acc[key].value += Number(inc.amount);
      return acc;
    }, {})
  );

  // Monthly trends
  const monthlyExpensesTrend = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("en", { month: "short" }),
    amount: filteredExpenses
      .filter(exp => new Date(exp.date).getMonth() === i)
      .reduce((sum, exp) => sum + Number(exp.amount), 0)
  }));

  const monthlyIncomeTrend = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("en", { month: "short" }),
    amount: filteredIncome
      .filter(inc => new Date(inc.date).getMonth() === i)
      .reduce((sum, inc) => sum + Number(inc.amount), 0)
  }));

  // Combined monthly comparison
  const monthlyComparison = Array.from({ length: 12 }, (_, i) => {
    const incomeSum = filteredIncome
      .filter(inc => new Date(inc.date).getMonth() === i)
      .reduce((sum, inc) => sum + Number(inc.amount), 0);

    const expenseSum = filteredExpenses
      .filter(exp => new Date(exp.date).getMonth() === i)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

    return {
      month: new Date(0, i).toLocaleString("en", { month: "short" }),
      income: incomeSum,
      expenses: expenseSum
    };
  });

  // Top 3
  const topExpenses = [...filteredExpenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const topIncome = [...filteredIncome]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const expenseColors = ["#3b82f6", "#f97316", "#22c55e", "#ef4444", "#a855f7"];
  const incomeColors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"];

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Dashboard</h2>

        {/* Month Filter */}
        <select onChange={(e) => setMonth(e.target.value)} style={{ marginBottom: "20px" }}>
          <option value="">All months</option>
          {[...Array(12)].map((_, i) => (
            <option value={i + 1} key={i}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        {/* Totals */}
        <h3>Total Expenses: {totalExpenses} DT</h3>
        <h3>Total Income: {totalIncome} DT</h3>
        <h3>Balance: {balance} DT</h3>

        {/* WARNING / SUCCESS MESSAGE */}
        {totalExpenses > totalIncome ? (
          <div className="warning-box">
            ⚠️ Warning: Your expenses are higher than your income!
          </div>
        ) : (
          <div className="success-box">
            ✅ Good job! Your income covers your expenses.
          </div>
        )}
        {/* Pie Charts */}
        <h4>Expenses by Category</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-exp-${index}`} fill={expenseColors[index % expenseColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <h4>Income by Source</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={incomeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {incomeData.map((entry, index) => (
                  <Cell key={`cell-inc-${index}`} fill={incomeColors[index % incomeColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <h4>Monthly Expenses Trend</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={monthlyExpensesTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <h4>Monthly Income Trend</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={monthlyIncomeTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expenses Comparison */}
        <h4>Income vs Expenses Comparison</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={monthlyComparison}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" />
              <Bar dataKey="expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top 3 Lists */}
        <h4>Top 3 Expenses</h4>
        <ul>
          {topExpenses.map((exp) => (
            <li key={exp._id}>{exp.title} - {exp.amount} DT ({exp.category})</li>
          ))}
        </ul>

        <h4>Top 3 Income</h4>
        <ul>
          {topIncome.map((inc) => (
            <li key={inc._id}>{inc.source} - {inc.amount} DT</li>
          ))}
        </ul>
      </div>
    </>
  );
}
