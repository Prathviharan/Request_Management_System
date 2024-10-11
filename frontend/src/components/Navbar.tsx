import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  MailOutlined,
  MessageOutlined,
  BarChartOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";

const Navbar: React.FC = () => {
  const [selected, setSelected] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navItem = [
    {
      key: "Dashboard",
      label: "Dashboard",
      icons: <DashboardOutlined />,
      path: "/",
    },
    {
      key: "Request",
      label: "Request",
      icons: <MailOutlined />,
      path: "/request",
    },
    {
      key: "Report",
      label: "Report",
      icons: <BarChartOutlined />,
      path: "/report",
    },
    {
      key: "Feedback",
      label: "Feedback",
      icons: <MessageOutlined />,
      path: "/feedback",
    },
    {
      key: "Settings",
      label: "Settings",
      icons: <SettingOutlined />,
      path: "/settings",
      Dropdown: true,
    },
  ];

  return (
    <nav className="bg-[#830823] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Dashboard</div>

        {/* Mobile menu button */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            ☰
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className={`lg:flex flex-1 justify-center ${showMenu ? "block" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-8">
            {navItem.map((item) => (
              <li key={item.key} className={`cursor-pointer flex items-center ${selected === item.key ? "bg-white text-black p-1 rounded" : ""}`}>
                {item.Dropdown ? (
                  <div className="relative">
                    <button className="flex items-center" onClick={toggleDropdown}>
                      {item.icons}
                      <span className="ml-2">{item.label}</span>
                      <DownOutlined className="ml-1" />
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-10">
                        <ul className="flex flex-col">
                          <li className="cursor-pointer p-2 hover:bg-gray-100">Help</li>
                          <li className="cursor-pointer p-2 hover:bg-gray-100">Settings</li>
                          <li className="cursor-pointer p-2 hover:bg-gray-100">FAQ</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center ${isActive ? "bg-white text-black p-1 rounded" : ""}`
                    }
                    onClick={() => setSelected(item.key)}
                  >
                    {item.icons}
                    <span className="ml-2">{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Placeholder for user button or profile icon */}
        <div className="hidden lg:flex">
          <button className="bg-white text-black px-4 py-2 rounded">Profile</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
