import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
    return history.push("/");
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1 miniPad">
        <span className="brand-logo">Сокращятор ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
