import React, { useEffect, useState, useRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import './Nav.css';

export default function Navigation() {
  const logoDefault = "/images/logo-site.png";
  const logoWhite = "/images/logo-white.png";

  const location = useLocation();
  const isHome = location.pathname === "/";

  const [logoSrc, setLogoSrc] = useState(logoDefault);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMouseOverNav, setIsMouseOverNav] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Atualiza a logo conforme página, scroll e mouse
  useEffect(() => {
    if (isHome) {
      if (hasScrolled) {
        setLogoSrc(logoDefault);
      } else {
        setLogoSrc(isMouseOverNav ? logoDefault : logoWhite);
      }
    } else {
      setLogoSrc(logoDefault);
    }
  }, [location.pathname, hasScrolled, isMouseOverNav]);

  // Detecta o scroll na página
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setHasScrolled(isScrolled);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fecha a sidebar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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

  // Eventos de mouse no nav
  const handleMouseEnter = () => {
    setIsMouseOverNav(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOverNav(false);
  };

  return (
    <div
      className={`search-container ${isHome ? "transparent-nav" : "solid-nav"} ${hasScrolled && isHome ? "scrolled-nav" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-container">
        <ul className="search-menu">
          <li className="menu-item">
            <img src={logoSrc} alt="Logo Orpheuswim" onClick={() => navigate("/")}/>
          </li>
          <li className="menu-item">
            <Link to="/" onClick={() => { setIsSidebarOpen(false); }}>HOME</Link>
          </li>
          <li className="menu-item">
            <Link to="/products" onClick={() => { setIsSidebarOpen(false); }}>PRODUTOS</Link>
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
            <Link to="/measure" onClick={() => { setIsSidebarOpen(false); }}>MEDIDAS</Link>
          </li>
        </ul>

        <div className="search-container-small">
          <FaBars className="hamburger-icon icon" onClick={() => setIsSidebarOpen(true)} />
        </div>

        <div className="icons-container">
          <FiShoppingCart className="icon cart-icon" onClick={() => navigate('/cart')} />
          {totalItems > 0 && <span className="cart-status">{totalItems}</span>}
        </div>
      </div>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>X</button>
        <nav className="navbar">
          <ul>
            <li><Link to="/" onClick={() => { setIsSidebarOpen(false); }}>HOME</Link></li>
            <li><Link to="/products" onClick={() => { setIsSidebarOpen(false); }}>PRODUTOS</Link></li>
            <li><Link to="/products?category=bikinis" onClick={() => setIsSidebarOpen(false)}>BIQUÍNIS</Link></li>
            <li><Link to="/products?category=conjuntos" onClick={() => setIsSidebarOpen(false)}>CONJUNTOS</Link></li>
            <li><Link to="/products?category=acessorios" onClick={() => setIsSidebarOpen(false)}>ACESSÓRIOS</Link></li>
            <li><Link to="/measure" onClick={() => { setIsSidebarOpen(false); }}>MEDIDAS</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
