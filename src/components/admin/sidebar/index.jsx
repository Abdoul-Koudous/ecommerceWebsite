import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp
} from "react-icons/md";
import "./adminsidebar.scss";

const AdminSidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    {
      label: "Produits",
      icon: <FaBoxOpen />,
      subLinks: [
        { to: "/admin/products", label: "Liste des produits" },
        { to: "/admin/products/add", label: "Ajouter un produit" },
        { to: "/admin/categories", label: "Catégories" },
      ],
    },
    {
      label: "Commandes",
      icon: <FaShoppingCart />,
      subLinks: [
        { to: "/admin/orders", label: "Toutes les commandes" },
        { to: "/admin/orders/pending", label: "En attente" },
        { to: "/admin/orders/delivered", label: "Livrées" },
      ],
    },
    { to: "/admin/users", label: "Utilisateurs", icon: <FaUsers /> },
  ];

  return (
    <aside className="admin-sidebar">
      {/* ==== Logo ==== */}
      <div className="sidebar-logo">
        <h2>Yebou<span>Shop</span></h2>
      </div>

      {/* ==== Liens ==== */}
      <div className="sidebar-links">
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              {link.subLinks ? (
                <>
                  {/* Lien parent avec flèche */}
                  <div
                    className="menu-parent"
                    onClick={() => toggleMenu(link.label)}
                  >
                    <div className="menu-left">
                      <span className="icon">{link.icon}</span>
                      <span className="label">{link.label}</span>
                    </div>
                    <span className="arrow">
                      {openMenus[link.label] ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </span>
                  </div>

                  {/* Sous-menu */}
                  {openMenus[link.label] && (
                    <ul className="submenu">
                      {link.subLinks.map((sub) => (
                        <li key={sub.to}>
                          <NavLink
                            to={sub.to}
                            className={({ isActive }) => (isActive ? "active" : "")}
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <span className="icon">{link.icon}</span>
                  <span className="label">{link.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ==== Déconnexion ==== */}
      <button className="logout-btn">
        <FaSignOutAlt className="icon" /> Déconnexion
      </button>
    </aside>
  );
};

export default AdminSidebar;
