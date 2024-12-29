import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Footer.css"; // Importar el archivo CSS

const Footer = () => {
  const notify = () => {
    toast.success("Thank you for visiting!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
    });
  };

  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="https://facebook.com" className="footer-link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <p className="footer-text">
        <FontAwesomeIcon icon={faEnvelope} /> contact@yourcompany.com
      </p>
      <p className="footer-text">© 2024 Your Company Name. All rights reserved.</p>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
