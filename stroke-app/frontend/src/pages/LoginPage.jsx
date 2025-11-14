import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [userExists, setUserExists] = useState(false);

  const [hovered, setHovered] = useState(null);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Login', path: '/' },
    { name: 'Info', path: '/info' },
    { name: 'Predict', path: '/predict' },
    { name: 'Chatbot', path: '/chatbot' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) setShowNav(false);
      else setShowNav(true);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSignupEmailChange = (e) => {
    const val = e.target.value;
    setSignupEmail(val);
    setUserExists(getUsers().some(u => u.email === val));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setMessage("Login successful! Redirecting...");
      setTimeout(() => window.location.href = "/info", 1200);
    } else {
      setMessage("Invalid credentials or user not found.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword) {
      setMessage("Please fill all fields.");
      return;
    }
    if (signupPassword !== signupConfirm) {
      setMessage("Passwords do not match.");
      return;
    }
    if (userExists) {
      setMessage("User already exists. Please login.");
      return;
    }
    saveUser({ email: signupEmail, password: signupPassword });
    setMessage("Signup successful! Please login.");
    setMode("login");
    setEmail(signupEmail);
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-50 to-white text-gray-800 flex flex-col">
      
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-4 py-2 transition-transform duration-300 z-50 ${
          showNav ? 'translate-y-0' : '-translate-y-24'
        }`}
      >
        <div className="flex items-center gap-2 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2c1.657 0 3 1.343 3 3v1a3 3 0 01-6 0V5c0-1.657 1.343-3 3-3zM12 8v12m0 0c-1.657 0-3-1.343-3-3v-1a3 3 0 016 0v1c0 1.657-1.343 3-3 3z"
            />
          </svg>
          <span className="text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors duration-300">
            NeuroPulse
          </span>
        </div>

        <div className="hidden md:flex gap-6 ml-auto">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`relative px-2 py-1 text-sm font-medium transition-all duration-300
                ${location.pathname === link.path ? 'text-teal-600' : 'text-gray-700'}
                ${hovered === idx ? 'text-teal-800 scale-105' : ''}`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 w-full h-0.5 bg-teal-600 transform scale-x-0 transition-transform duration-300 ${
                  hovered === idx || location.pathname === link.path ? 'scale-x-100' : ''
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <HiMenu className="h-6 w-6 text-teal-600" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-bold text-teal-600">NeuroPulse</span>
          <button onClick={() => setSidebarOpen(false)}>
            <HiX className="h-6 w-6 text-teal-600" />
          </button>
        </div>
        <div className="flex flex-col mt-4 gap-4 px-4">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`px-2 py-2 rounded hover:bg-teal-100 transition-colors ${
                location.pathname === link.path ? 'bg-teal-200 text-teal-700 font-semibold' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Login / Signup Card */}
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-teal-700 text-center mb-6"> NeuroPulse</h1>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`font-semibold ${mode === "login" ? "text-teal-700 border-b-2 border-teal-600" : "text-gray-500"}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`font-semibold ${mode === "signup" ? "text-teal-700 border-b-2 border-teal-600" : "text-gray-500"}`}
            >
              Sign Up
            </button>
          </div>

          {message && <div className="text-center text-teal-600 mb-4">{message}</div>}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="submit" className="btn bg-teal-600 text-white hover:bg-teal-700 transition-colors">Login</button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input className="input" placeholder="Email" value={signupEmail} onChange={handleSignupEmailChange} required />
              <input className="input" type="password" placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
              <input className="input" type="password" placeholder="Confirm Password" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} required />
              <button type="submit" className="btn bg-teal-600 text-white hover:bg-teal-700 transition-colors">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
