import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const myMenus = [
    {
      label: "HOME",
      path: "/",
    },
    {
      label: "ABOUT",
      path: "/about",
    },
    {
      label: "CONTACT",
      path: "/contact",
    },
  ];
  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between bg-gray-200 px-5 py-3 rounded-md">
        <div>
          <img src="./logo.png" alt="" />
        </div>
        <div>
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
        </div>
        <button className="bg-[#425194] text-white px-4 py-2 rounded-md">
          Get App
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden overflow-hidden">
        <div className="py-1 flex items-center justify-between lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {!menuOpen ? (
              <GiHamburgerMenu className="text-2xl" />
            ) : (
              <RxCross2 className="text-2xl" />
            )}
          </button>
          <div>
            <Link to="/">
              <img src="./logo.png" alt="logo.png" className="w-[120px]" />
            </Link>
          </div>
        </div>

        {/* Mobile menu container with transition */}
        <div
          className={`flex flex-col gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-[500px] py-3" : "max-h-0"
          }`}
        >
          {myMenus.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(!menuOpen)}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-700 text-[16px] font-semibold transition duration-300"
                    : "text-black text-[16px] font-[500] hover:text-yellow-600 transition duration-300"
                }
              >
                {item.label}
              </NavLink>
            );
          })}
          <div>
            <Link
              to="/fleet"
              className="p-2 text-[12px] bg-[#425194] text-white rounded-md shadow-lg"
            >
              Get App
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
