import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaTrash } from "react-icons/fa";

export default function IncomeList() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  const [income, setIncome] = useState([]);
  const [month, setMonth] = useState("");

  const token = localStorage.getItem("token");

  // Fetch incomes for the logged-in user
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/income", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setIncome(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncome((prev) => prev.filter((inc) => inc._id !== id));
    } catch (err) {
      console.error("Failed to delete income:", err);
      alert("Failed to delete income");
    }
  };

  // Filter by month
  const filteredIncome = income.filter((inc) => {
    if (!month) return true;
    return new Date(inc.date).getMonth() + 1 === Number(month);
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>My Income</h2>

        {/* Month Filter */}
        <select onChange={(e) => setMonth(e.target.value)} >
          <option value="">All months</option>
          {[...Array(12)].map((_, i) => (
            <option value={i + 1} key={i}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        {/* Income Cards */}
        {filteredIncome.length === 0 ? (
          <p style={{ marginTop: "20px", textAlign: "center" }}>No income records found.</p>
        ) : (
          filteredIncome.map((inc) => (
            <div
              key={inc._id}
              className={`expense-card ${inc.source.toLowerCase().replace(/ /g, "-")}`}
            >
              <p>
                <strong>{inc.source}</strong> — {inc.amount} DT
                <br />
                <small>{new Date(inc.date).toLocaleDateString()}</small>
              </p>

              <button type="button" onClick={() => deleteIncome(inc._id)}>
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
