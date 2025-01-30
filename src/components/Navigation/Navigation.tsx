import React from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import './Navigation.css';

export default function Navigation () {
    return(
         <div className="search-container">
            <ul className="search-menu">
              <li className="menu-item">
                <img src="./images/logo-site.png" alt="Logo Oprheuswim" />
              </li>
  
              <li className="menu-item">
                <a href="#">Home</a>
              </li>
  
              <li className="menu-item">
                <a href="#">Bikinis</a>
              </li>
  
              <li className="menu-item">
                <a href="#">Conjuntos</a>
              </li>
  
              <li className="menu-item">
                <a href="#">Acessórios</a>
              </li>
            </ul>
  
            <div className="icons-container">
                <FiUser className="icon" />
                <FiShoppingCart className="icon" />
            </div>
          </div>
    );
}