import React, { useState, useRef, useEffect } from "react";
import {
  RiMenu2Line,
  RiNotification3Line,
  RiSettings3Line,
  RiGlobeLine,
} from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "./adminheader.scss";

const AdminHeader = ({ onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = 4;

  const user = {
    name: "Abdoul-Koudous",
    email: "admin@yeboushop.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCzK6DKnIE7MM_7cuaQAJlpxUHYs8yKDT3yg&s",
  };

  return (
    <header className="admin-header">
      <div className="part1">
        {/* 👇 quand on clique ici, on réduit la sidebar */}
        <button className="menu-btn" onClick={onToggleSidebar}>
          <RiMenu2Line />
        </button>
      </div>

      <div className="part2">
        <div className="icon-wrapper badge">
          <RiNotification3Line className="icon" />
          <span className="badge-number">
            {notifications > 9 ? "9+" : notifications}
          </span>
        </div>

        <div className="icon-wrapper">
          <RiSettings3Line className="icon" />
        </div>

        <div className="icon-wrapper">
          <RiGlobeLine className="icon" />
        </div>

        <div className="user-menu" ref={menuRef}>
          <div
            className="user-profile"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <img src={user.avatar} alt="User" className="avatar" />
          </div>

          {isMenuOpen && (
            <div className="dropdown-menu">
              <div className="profile-header">
                <img src={user.avatar} alt="User" className="avatar" />
                <div className="info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>

              <ul className="menu-items">
                <li><FaUserCircle className="icon" /> Mon compte</li>
                <li><RiSettings3Line className="icon" /> Paramètres</li>
                <li className="logout"><IoMdLogOut className="icon" /> Déconnexion</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
