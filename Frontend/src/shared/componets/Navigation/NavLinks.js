import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

function NavLinks(props) {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink
          to="/users"
          exact="true"
          className="hover:rounded-md active:rounded-md"
        >
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink
            className="hover:rounded-md active:rounded-md"
            to={`/${auth.userId}/places`}
          >
            My Places
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink
            className="hover:rounded-md active:rounded-md"
            to="/places/new"
          >
            Add Place
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li className="bg-[#ff4d1c] rounded-md p-2 text-white">
          <NavLink className="hover:rounded-md active:rounded-md" to="/auth">
            Log in
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button
            className="hover:rounded-md active:rounded-md hover:color-white"
            onClick={auth.logout}
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
