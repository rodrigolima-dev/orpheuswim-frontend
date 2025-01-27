import { IoIosArrowUp, IoIosArrowDown, IoIosCall } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import './App.css';
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCategories = () => {
    setIsExpanded(!isExpanded);
  };

  const closeCategories = () => {
    setIsExpanded(false);
  };

  return (
    <div className="home">

      <header>
        <div className="header-content">
          <div className="call">
            <IoIosCall />
            <h3>+55 21 983103439</h3>
          </div>
          <div className="location">
            <FaLocationDot />
            <h3>Rio de Janeiro - RJ</h3>
          </div>
        </div>
      </header>

      <nav>
        <div className="search-container">
          <ul className="search-menu">
            <li className="menu-item">
              <img src="./images/logo-site.png" alt="Logo Oprheuswim" />
            </li>
            <li className="menu-item">
              <button className="categories-btn" onClick={toggleCategories}>
                <p>Categorias</p>
                {isExpanded ? (
                  <IoIosArrowUp className="arrow-btn" />
                ) : (
                  <IoIosArrowDown className="arrow-btn" />
                )}
              </button>
              {isExpanded && (
                <ul className="categories-list">
                  <li>Bikinis</li>
                  <li>Roupas</li>
                  <li>Acessórios</li>
                </ul>
              )}
            </li>
            <li className="menu-item">
              <div className="search-wrapper" style={{ position: 'relative' }}>
                <input
                  type="search"
                  placeholder="Pesquisar"
                  className="search-input"
                  style={{
                    width: '400px',
                    padding: '8px 20px',
                    borderRadius: '40px',
                    border: '1px solid #ccc',
                    
                  }}
                />
                <BiSearch
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#aaa',
                    fontSize: '20px',
                  }}
                />
              </div>
            </li>
          </ul>

          <div className="icons-container">
              <FiUser className="icon" />
              <FiShoppingCart className="icon" />
          </div>
        </div>
      </nav>

      <main>
        <div className="main-container">
          <div className="slogan">
            <h1>Bikini Azul Oceano<br/><span>Leve como o verão, único como você.</span></h1>
            <button>
              <p>Adquirir</p>
            </button>
          </div>

          <img src="./images/header-photo.png" alt="Menina com bikini de crochê azul na praia" className="main-image"/>
        </div>

        <div>
          <h1>teste</h1>
        </div>
      </main>
    </div>

    
  );
}

export default App;
