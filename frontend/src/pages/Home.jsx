import { Link } from "react-router-dom";
import { FaPlusCircle, FaList } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>

      <Link to="/add">
        <FaPlusCircle /> Add Expense
      </Link>

      <Link to="/list">
        <FaList /> View Expenses
      </Link>
    </div>
  );
}
