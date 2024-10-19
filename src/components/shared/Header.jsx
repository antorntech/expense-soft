import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const myMenus = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="bg-gray-200 px-3 md:px-0 py-3 rounded-md">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between px-3">
        <Link to="/">
          <img src="./logo.png" alt="logo" className="w-[140px]" />
        </Link>
        <ul className="flex items-center gap-5">
          {myMenus.map((menu) => (
            <li key={menu.path}>
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  isActive ? "text-[#425194] font-semibold" : "font-semibold"
                }
              >
                {menu.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          className="bg-[#425194] text-white px-4 py-2 rounded-md"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          Log Out
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {/* Mobile Menu Header with Icon */}
        <div className="flex items-center justify-between">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <RxCross2 className="text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-2xl" />
            )}
          </button>
          <Link to="/">
            <img src="./logo.png" alt="logo" className="w-[120px]" />
          </Link>
        </div>

        {/* Mobile Menu Items with Transition */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-[500px] py-3" : "max-h-0"
          } overflow-hidden`}
        >
          <ul className="flex flex-col gap-3 mt-3">
            {myMenus.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)} // Close menu on click
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-700 text-[16px] font-semibold"
                      : "text-black text-[16px] font-medium hover:text-yellow-600"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/"
                className="p-2 text-[12px] bg-[#425194] text-white rounded-md shadow-lg"
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                Get App
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
