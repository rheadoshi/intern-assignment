import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu on mobile view
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-primary text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold font-sans">Stock Market Dashboard</h1>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-gray-300">Home</a>
          <a href="#about" className="hover:text-gray-300">About</a>
        </div>
      </div>

      {/* Mobile Menu - shown when menuOpen is true */}
      <div
        className={`md:hidden bg-primary absolute top-16 left-0 w-full px-6 py-4 transition-all duration-300 ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <a href="#home" className="block py-2 text-white hover:text-gray-300" onClick={toggleMenu}>Home</a>
        <a href="#about" className="block py-2 text-white hover:text-gray-300" onClick={toggleMenu}>About</a>
      </div>
    </nav>
  );
};

export default Navbar;
