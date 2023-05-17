import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Navbar from "../components/Navbar";
import CartContainer from "./cart/CartContainer";

const Navigation = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/cart" element={ <CartContainer /> } />
        </Routes>
      </Router>
    </>
  );
};

export default Navigation;
