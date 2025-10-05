import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-gold-400 shadow-lg border-b border-gold-700">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-gold-400 hover:text-gold-300 transition-colors duration-300"
        >
          CreditRisk<span className="text-white">AI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/predict">Predict</NavLink>
          <NavLink to="/results">Results</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gold-400 hover:text-gold-300 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gold-700">
          <div className="flex flex-col space-y-4 px-6 py-4 font-medium">
            <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/predict" onClick={() => setIsOpen(false)}>Predict</NavLink>
            <NavLink to="/results" onClick={() => setIsOpen(false)}>Results</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

/* Reusable link component */
const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="hover:text-gold-300 transition-colors duration-300"
  >
    {children}
  </Link>
);
