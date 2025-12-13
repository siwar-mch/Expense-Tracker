import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaList, FaChartBar } from "react-icons/fa";
import "./Navbar.css"; // import the CSS

export default function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name"); // get logged-in user's name

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"><FaPlusCircle/> Add Expense</Link>
        <Link to="/expenses"><FaList/> Expenses</Link>
        <Link to="/add-income"><FaPlusCircle />Add Income</Link>
        <Link to="/income"><FaList/>My Income</Link>
        <Link to="/dashboard"><FaChartBar /> Dashboard</Link>
      </div>

      <div className="user-section">
        {name && <span>Hello, {name}</span>}
        {name && <button onClick={handleLogout} className="logout-button">Logout</button>}
      </div>
    </div>
  );
}
