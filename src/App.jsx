import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";



// Pages
import Home from "./pages/home";
import ProductListing from "./components/productlisting";
import ProductDetails from "./pages/productdetails";
import Login from "./pages/login";
import Register from "./pages/register";
import CartPage from "./pages/cart";
import Verify from "./pages/verify";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetpassword";
import Checkout from "./pages/checkout";

// Account
import AccountLayout from "./pages/myaccount/AccountLayout";
import ProfilePage from "./pages/myaccount/profilePage";
import OrdersPage from "./pages/myaccount/orderspage";
import WishlistPage from "./pages/myaccount/wishlistpage";
import SettingsPage from "./pages/myaccount/settingspage";
import LogoutPage from "./pages/myaccount/logoutpage";

// Admin
import Dashboard from "./pages/admin/Dashboard";


// Layouts
import AdminLayout from "./layouts/adminlayout";
import MainLayout from "./layouts/mainlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === CLIENT ROUTES === */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/productlisting"
          element={
            <MainLayout>
              <ProductListing />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />
        <Route
          path="/verify"
          element={
            <MainLayout>
              <Verify />
            </MainLayout>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <MainLayout>
              <ForgotPassword />
            </MainLayout>
          }
        />
        <Route
          path="/resetpassword"
          element={
            <MainLayout>
              <ResetPassword />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />

        {/* === COMPTE CLIENT === */}
        <Route
          path="/account"
          element={
            <MainLayout>
              <AccountLayout />
            </MainLayout>
          }
        >
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>

        {/* === ADMIN === */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
