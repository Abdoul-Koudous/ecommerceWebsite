import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home';
import "./App.scss"
import ProductListing from './components/productlisting';
import ProductDetails from './pages/productdetails';

function App() {
  

  return (
    <>
    <BrowserRouter>
       <Header/>
       <Routes>
          <Route path={"/"} exact={true} element={<Home/>} />
          <Route path={"/productlisting"} exact={true} element={<ProductListing/>} />
          <Route path={"/product/:id"} exact={true} element={<ProductDetails/>} />
          
       </Routes>
       <Footer/>
    </BrowserRouter>
     
    </>
  )
}

export default App
