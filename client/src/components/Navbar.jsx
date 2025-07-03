import { Link } from "react-router-dom";
import { assest } from "../assets/assests";
import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, navigate } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Optional: Add shadow and background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 md:px-16 lg:px-24 xl:px-32">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-semibold tracking-wide text-purple-700"
          onClick={() => setMenuOpen(false)}
        >
          <img
            className="h-10 w-10"
            src={assest.logo}
            alt="logo"
            draggable={false}
          />
          AGENT
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8 text-lg font-medium text-gray-700">
          <Link
            to="/"
            className="relative group px-2 py-1 hover:text-purple-600 focus:outline-none focus:text-primary"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-purple-500 transition-all"></span>
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="relative group px-2 py-1 hover:text-purple-600 focus:outline-none focus:text-primary"
              >
                Dashboard
                <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-purple-500 transition-all"></span>
              </Link>
              <p>Welcome {user.name}</p>
              <button
                onClick={handleLogout}
                className="ml-4 px-5 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="ml-4 px-5 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex items-center relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex flex-col justify-center items-center w-10 h-10 group focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-md"
          >
            <span
              className={`block w-6 h-0.5 bg-purple-600 rounded transition-transform duration-300 ease-in-out origin-center ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-purple-600 rounded my-1.5 transition-opacity duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-purple-600 rounded transition-transform duration-300 ease-in-out origin-center ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-56 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <img
              onClick={() => setMenuOpen(false)}
              className="absolute left-1 top-3 size-7"
              src={assest.cross}
              alt=""
            />
            <nav className="flex flex-col mt-20 px-6 space-y-4 text-gray-700 font-semibold text-lg">
              {user && <p className="text-primary">Welcome {user.name}</p>}
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-2 py-2 transition-colors"
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-2 py-2 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="text-left hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-2 py-2 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-2 py-2 transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
