import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";

// === Layouts ===
import MainLayout from "./layouts/mainlayout";
import AdminLayout from "./layouts/adminlayout";

// === Pages Client ===
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

// === Compte client ===
import AccountLayout from "./pages/myaccount/AccountLayout";
import ProfilePage from "./pages/myaccount/profilePage";
import OrdersPage from "./pages/myaccount/orderspage";
import WishlistPage from "./pages/myaccount/wishlistpage";
import SettingsPage from "./pages/myaccount/settingspage";
import LogoutPage from "./pages/myaccount/logoutpage";

// === Admin ===
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/products";
import AddProduct from "./pages/admin/products/addproduct";
// (tu pourras ajouter plus tard : Products, Orders, Users, Settings, etc.)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === FRONT CLIENT === */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productlisting" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* === COMPTE UTILISATEUR === */}
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>
        </Route>

        {/* === ADMIN === */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products/lists" element={<Products />} />
          <Route path="/admin/products/add" element={<AddProduct/>} />

          {/* tu pourras ajouter d’autres pages admin ici */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
