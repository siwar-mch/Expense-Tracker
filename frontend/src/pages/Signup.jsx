import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", form);
    alert("Account created!");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})} />
        <button>Create Account</button>
      </form>
    </div>
  );
}
