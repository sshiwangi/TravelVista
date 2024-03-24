import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";
import { useAuth } from "../../hooks/auth-hook";
import Dropdown from "../UIElements/Dropdown";

function NavLinks(props) {
  const auth = useContext(AuthContext);
  const { token, login, logout, userId, userProfile, fetchUserProfile } =
    useAuth();

  return (
    <ul className="nav-links">
      {/* <li>
        <NavLink
          to="/users"
          exact="true"
          className="hover:rounded-md active:rounded-md"
        >
          All Users
        </NavLink>
      </li> */}
      <li>
        <NavLink
          to="/places"
          exact="true"
          className="hover:rounded-md active:rounded-md"
        >
          All Places
        </NavLink>
      </li>
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink
            className="hover:rounded-md active:rounded-md"
            to={`/${auth.userId}/places`}
          >
            My Places
          </NavLink>
        </li>
      )} */}
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
      {/* {auth.isLoggedIn && (
        <li>
          <button
            className="hover:rounded-md active:rounded-md hover:color-white"
            onClick={auth.logout}
          >
            Logout
          </button>
        </li>
      )} */}
      {auth.isLoggedIn && userProfile && userProfile.user && (
        <li>
          <Dropdown imgpath={userProfile.user.image} />
          {/* <div className="flex items-center gap-2">
            <img
              className="h-[40px] w-[40px] rounded-full"
              src={`${process.env.REACT_APP_ASSET_URL}/${userProfile.user.image}`}
            />
            <span>{userProfile.user.name}</span>
          </div> */}
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
