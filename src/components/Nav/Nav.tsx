import React, { useEffect, useState, useRef } from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import './Nav.css';
import { FaBars } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Navigation () {
  const logoDefault = "/images/logo-site.png";
  const logoWhite = "/images/logo-white.png";
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
    <div
      className={`search-container ${isHome ? "transparent-nav" : "solid-nav"}`}
      onMouseEnter={() => isHome && setLogoSrc(logoDefault)}
      onMouseLeave={() => isHome && setLogoSrc(logoWhite)}
    >
      <div className="nav-container">
        <ul className="search-menu">
          <li className="menu-item">
            <img src={logoSrc} alt="Logo Oprheuswim" />
          </li>
          <li className="menu-item">
            <Link to="/" onClick={() => { setLogoSrc(logoDefault); setIsSidebarOpen(false) }}>HOME</Link>
          </li>
          <li className="menu-item">
            <Link to="/products" onClick={() => { setLogoSrc(logoDefault); setIsSidebarOpen(false) }}>PRODUTOS</Link>
          </li>
          <li className="menu-item">
            <Link to="/products?category=bikinis" onClick={() => setIsSidebarOpen(false)}>BIQUÍNIS</Link>
          </li>
          <li className="menu-item">
            <Link to="/products?category=conjuntos" onClick={() => setIsSidebarOpen(false)}>CONJUNTOS</Link>
          </li>
          <li className="menu-item">
            <Link to="/products?category=acessorios" onClick={() => setIsSidebarOpen(false)}>ACESSÓRIOS</Link>
          </li>
          <li className="menu-item">
            <Link to="/measure" onClick={() => { setLogoSrc(logoDefault); setIsSidebarOpen(false) }}>MEDIDAS</Link>
          </li>
        </ul>

        <div className="search-container-small">
          <FaBars className="hamburger-icon icon" onClick={() => setIsSidebarOpen(true)} />
        </div>

        <div className="icons-container">
          <FiShoppingCart className="icon" />
        </div>
      </div>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>X</button>
        <nav className="navbar">
          <ul>
            <li><Link to="/" onClick={() => { setLogoSrc(logoDefault); setIsSidebarOpen(false) }}>HOME</Link></li>
            <li><Link to="/products" onClick={() => { setLogoSrc(logoDefault); setIsSidebarOpen(false) }}>PRODUTOS</Link></li>
            <li><Link to="/products?category=bikinis" onClick={() => setIsSidebarOpen(false)}>BIQUÍNIS</Link></li>
            <li><Link to="/products?category=conjuntos" onClick={() => setIsSidebarOpen(false)}>CONJUNTOS</Link></li>
            <li><Link to="/products?category=acessorios" onClick={() => setIsSidebarOpen(false)}>ACESSÓRIOS</Link></li>
            <li><Link to="/measure" onClick={() => { setLogoSrc(logoDefault); setIsSidebarOpen(false) }}>MEDIDAS</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
