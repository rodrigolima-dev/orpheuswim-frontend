import { FaWhatsapp } from "react-icons/fa";
import { isDemoMode } from "../../services/apiConnect";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">

        <div className="terms-container">
          <p>© 2024 Catálogo artesanal. Todos os direitos reservados.</p>
        </div>

        <div className="contact">
          {!isDemoMode && (
            <a href="https://wa.me/5521983103439" target="_blank" rel="noreferrer">
              <FaWhatsapp className="contact-icon" />
            </a>
          )}

        </div>


      </footer>
    </div>
  );
}
