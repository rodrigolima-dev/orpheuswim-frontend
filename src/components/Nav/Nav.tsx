import React, { useEffect, useState, useRef } from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import './Nav.css';
import { FaBars } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navigation () {
  const logoDefault = "./images/logo-site.png";
  const logoWhite = "./images/logo-white.png";
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [logoSrc, setLogoSrc] = useState(isHome ? logoWhite : logoDefault);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLogoSrc(isHome ? logoWhite : logoDefault);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const navigate = useNavigate();

  return (
    <div className={`search-container ${isHome ? "transparent-nav" : "solid-nav"}`}
      onMouseEnter={() => isHome && setLogoSrc(logoDefault)}
      onMouseLeave={() => isHome && setLogoSrc(logoWhite)}>
      <div className="nav-container">
        <ul className="search-menu">
          <li className="menu-item">
            <img src={logoSrc} alt="Logo Oprheuswim" />
          </li>
          <li className="menu-item"><a href="#" onClick={() => { navigate("/"); setLogoSrc(logoDefault); }}>HOME</a></li>
          <li className="menu-item"><a href="#">BIKINIS</a></li>
          <li className="menu-item"><a href="#">CONJUNTOS</a></li>
          <li className="menu-item"><a href="#">ACESSÓRIOS</a></li>
          <li className="menu-item"><a href="#" onClick={() => { navigate('/measure'); setLogoSrc(logoDefault); }}>MEDIDAS</a></li>
        </ul>
        <div className="search-container-small">
          <FaBars className="hamburger-icon icon" onClick={() => setIsSidebarOpen(true)} />
        </div>
        <div className="icons-container">
          <FiUser className="icon" />
          <FiShoppingCart className="icon" />
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} ref={sidebarRef}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>X</button>
        <nav className="navbar">
          <ul>
            <li><a href="#"  onClick={() => { navigate("/"); setLogoSrc(logoDefault); }}>HOME</a></li>
            <li><a href="#">BIKINIS</a></li>
            <li><a href="#">CONJUNTOS</a></li>
            <li><a href="#">ACESSÓRIOS</a></li>
            <li><a href="#" onClick={() => { navigate('/measure'); setLogoSrc(logoDefault); }}>MEDIDAS</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}