import React from "react";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="terms-container">
        <p>© 2024 Orpheuswim. Todos os direitos reservados.</p>
      </div>


      <div className="contact-container">
        <div className="contact">
          <a href="https://wa.me/5521983103439" target="_blank">
            <FaWhatsapp className="contact-icon" />
          </a>

          <a href="https://www.instagram.com/orpheuswim/" target="_blank">
            <FaInstagram className="contact-icon" />
          </a>
        </div>
      </div>
      



    </footer>
  );
}
