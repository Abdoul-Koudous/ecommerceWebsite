import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home';
import "./App.scss"
import ProductListing from './components/productlisting';
import ProductDetails from './pages/productdetails';
import Login from './pages/login';
import Register from './pages/register';
import CartPage from './pages/cart';
import Verify from './pages/verify';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetpassword';
import Checkout from './pages/checkout';
import MyAccount from './pages/myaccount';

function App() {
  

  return (
    <>
    <BrowserRouter>
       <Header/>
       <Routes>
          <Route path={"/"} exact={true} element={<Home/>} />
          <Route path={"/productlisting"} exact={true} element={<ProductListing/>} />
          <Route path={"/product/:id"} exact={true} element={<ProductDetails/>} />
          <Route path={"/login"} exact={true} element={<Login/>} />
          <Route path={"/register"} exact={true} element={<Register/>} />
          <Route path={"/cart"} exact={true} element={<CartPage/>} />
          <Route path={"/verify"} exact={true} element={<Verify/>} />
          <Route path={"/forgotpassword"} exact={true} element={<ForgotPassword/>} />
          <Route path={"/resetpassword"} exact={true} element={<ResetPassword/>} />
          <Route path={"/checkout"} exact={true} element={<Checkout/>} />
          <Route path={"/account"} exact={true} element={<MyAccount/>} />
          
       </Routes>
       <Footer/>
    </BrowserRouter>
     
    </>
  )
}

export default App
