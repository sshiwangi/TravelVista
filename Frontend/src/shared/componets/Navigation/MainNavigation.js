import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/BackDrop";
import { CgMenuRight } from "react-icons/cg";
import logo from "../../../assets/travelVistaLogo.png";

function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = function () {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <React.Fragment>
      {drawerIsOpen && <BackDrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <CgMenuRight
          size={32}
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        />
        {/* <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button> */}
        <h1 className="main-navigation__title">
          <Link to="/">
            <img className="h-[30px]" src={logo} />
            {/* TravelVista */}
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
