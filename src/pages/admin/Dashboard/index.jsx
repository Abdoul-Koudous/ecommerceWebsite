import React from "react";
import "./dashboard.scss";
import DashboardBoxe from "../../../components/admin/dashboardboxes";
import OrdersTabPage from "../../myaccount/orderstabpage";

const Dashboard = () => {
  const adminName = "Abdoul-Koudous"; // pourra venir d’un contexte ou API plus tard

  return (
    <div className="dashboard">
      {/* ====== SECTION D’EN-TÊTE ====== */}
      <div className="dashboard-header">
        {/* Partie gauche */}
        <div className="left">
          <h2>
            Bonjour, bienvenue <span>{adminName}</span> 👋
          </h2>
          <p>
            Voici un aperçu de votre activité. Suivez vos ventes, produits et
            performances du mois en un coup d’œil.
          </p>
          <button className="add-btn">+ Ajouter un produit</button>
        </div>

        {/* Partie droite */}
        <div className="right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331966.png"
            alt="Illustration shopping"
          />
        </div>
      </div>

      {/* ====== LES CARTES STATISTIQUES ====== */}
      <DashboardBoxe />
      <div className="recentOrder">
        <h2>Commandes Recents</h2>
        <OrdersTabPage/>
      </div>
    </div>
  );
};

export default Dashboard;
