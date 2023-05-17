import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import ViteLogo from "../assets/image/vite.svg";
import reactLogo from "../assets/react.svg";
import { BsCart3, BsPersonCircle } from "react-icons/bs"; // replace with your path

const Navbar: React.FC = () => {
  const { amount } = useAppSelector((store) => store.cart);

  return (
    <div className="navbar">
      <Link to="/" className="navbar__logo">
        <img src={ViteLogo} alt="Vite logo" id="logo_margin" />{" "}
        <img src={reactLogo} alt="React logo" id="logo_margin" />{" "}
      </Link>
      <div className="navbar__cart">

          <Link to="/" style={{ margin: '0 10px' }}>
            <BsPersonCircle style={{fontSize: "1rem"}} />Login
          </Link>
    
          <Link to="/cart" style={{ margin: '0 10px' }}>
            Cart <BsCart3 /> {amount}
          </Link>
 
      </div>
    </div>
  )
};

export default Navbar;
