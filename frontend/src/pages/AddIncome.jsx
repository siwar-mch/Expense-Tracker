import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AddIncome() {
  const token = localStorage.getItem("token");

  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/income",
      { amount, source, date },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Income added!");
    setAmount("");
    setSource("");
    setDate("");
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Add Income</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <select value={source} onChange={(e) => setSource(e.target.value)} required>
            <option value="">Select income source</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Business">Business</option>
            <option value="Gift">Gift</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit">Add Income</button>
        </form>
      </div>
    </>
  );
}
