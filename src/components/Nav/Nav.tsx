import React, { useState } from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import './Nav.css';
import { FaBars } from "react-icons/fa";

export default function Navigation () {
  const logoDefault = "./images/logo-site.png";
  const logoWhite = "./images/logo-white.png";

  const [logoSrc, setLogoSrc] = useState(logoWhite);

  return(
      <div className="search-container"
      onMouseEnter={() => setLogoSrc(logoDefault)}
      onMouseLeave={() => setLogoSrc(logoWhite)}
      >
        <div className="nav-container">

            <ul className="search-menu">
              <li className="menu-item">
                <img src={logoSrc} alt="Logo Oprheuswim" />
              </li>

              <li className="menu-item">
                <a href="#">HOME</a>
              </li>

              <li className="menu-item">
                <a href="#">BIKINIS</a>
              </li>

              <li className="menu-item">
                <a href="#">CONJUNTOS</a>
              </li>

              <li className="menu-item">
                <a href="#">ACESSÓRIOS</a>
              </li>
            </ul>

            <div className="search-container-small">
              <details className="hamburger-menu">
                <summary>
                  <FaBars className="hamburger-icon icon" /> {/* Ícone de hamburger */}
                </summary>
                <nav className="navbar">
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Bikinis</a></li>
                    <li><a href="#">Conjuntos</a></li>
                    <li><a href="#">Acessórios</a></li>
                  </ul>
                </nav>
              </details>
            </div>

            <div className="icons-container">
                <FiUser className="icon" />
                <FiShoppingCart className="icon" />
            </div>
          </div>
        </div>
  );
}