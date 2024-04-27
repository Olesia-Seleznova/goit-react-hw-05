import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getActiveNav = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <div>
      <nav>
        <NavLink to="/" className={getActiveNav}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getActiveNav}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
