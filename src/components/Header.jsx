import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./Header.css";

const Header = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);

  const linksCommon = [{ to: "/", text: "Inicio", icon: faHouse }];
  const linksLoggedIn = [
    { to: "/mis-movies", text: "Mis Movies" },
    { to: "/crear-movie", text: "Crear Movie" },
  ];
  const linksLoggedOut = [
    { to: "/login", text: "Login" },
    { to: "/register", text: "Register" },
  ];

  const handleLogout = () => {
    setIsLogged(false);
    toast.success("Logout!")
  };

  return (
    <header className="header">
      <div className="header-links">
        {linksCommon.map((link) => (
          <Link key={link.to} to={link.to} className="header-link">
            <FontAwesomeIcon icon={link.icon} className="header-icon" /> {link.text}
          </Link>
        ))}
      </div>
      <div className="header-links">
        {isLogged &&
          linksLoggedIn.map((link) => (
            <Link key={link.to} to={link.to} className="header-link">
              {link.text}
            </Link>
          ))}
        {isLogged && (
          <button className="header-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="header-icon" /> Cerrar Sesión
          </button>
        )}
        {!isLogged &&
          linksLoggedOut.map((link) => (
            <Link key={link.to} to={link.to} className="header-link">
              {link.text}
            </Link>
          ))}
      </div>
    </header>
  );
};

export default Header;
