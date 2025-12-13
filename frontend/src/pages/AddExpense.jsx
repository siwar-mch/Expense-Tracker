import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AddExpense() {
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/expenses",
        { title, amount, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Expense added!");
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Add Expense</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Expense title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {/* CATEGORY DROPDOWN */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit">Add Expense</button>
        </form>
      </div>
    </>
  );
}
