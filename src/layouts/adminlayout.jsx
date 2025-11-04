// layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/header";
import AdminSidebar from "../components/admin/sidebar";
import "./adminlayout.scss";


const AdminLayout = () => {
  return (
    <section className="admin-layout">
      <AdminHeader/>
      <div className="admin-body">
        <AdminSidebar/>
        <main className="admin-content">
          <Outlet/>
        </main>
      </div>
    </section>
  );
};

export default AdminLayout;
