import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-[var(--primary-color)] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">Evaluations 360</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
        <ul
          className={`flex-col md:flex p-6 md:p-0 md:flex-row md:items-center absolute md:static bg-[var(--primary-color)] md:bg-transparent w-full md:w-auto transition-all duration-300 ease-in ${
            isOpen ? "top-16 left-0" : "top-[-200px] left-0"
          }`}
        >
          {user ? (
            <>
              <li className="p-2">
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li className="p-2">
                <Link
                  to="/evaluations"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Evaluations
                </Link>
              </li>
              <li className="p-2">
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Profile
                </Link>
              </li>

              <li className="md:ml-6">
                <button
                  onClick={() => {
                    logOut();
                    navigate("/login");
                  }}
                  className="bg-red-500 border-red-500 py-1 text-white hover:bg-red-600 transition-colors"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="p-2">
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li className="p-2">
                <Link to="/register" className="text-white hover:text-gray-300">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
