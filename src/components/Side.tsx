import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Side = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside
      className={`z-10 fixed top-16 md:top-14 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0`}
    >
      <button onClick={toggleSidebar} className="md:hidden mb-4 text-right">
        ✖
      </button>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block p-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <span
              className="block p-2 rounded hover:bg-gray-700"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onClick={toggleDropdown}
              // onMouseLeave={() => setIsDropdownOpen(false)}
            >
              User
            </span>
            {isDropdownOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    to="/users"
                    className="block p-2 rounded hover:bg-gray-700"
                    onClick={toggleDropdown}
                  >
                    User List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-user"
                    className="block p-2 rounded hover:bg-gray-700"
                    onClick={toggleDropdown}
                  >
                    Add User
                  </Link>
                </li>
              </ul>
            )}
          </li>
        
          <li>
            <Link
              to="/settings"
              className="block p-2 rounded hover:bg-gray-700"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Side;
