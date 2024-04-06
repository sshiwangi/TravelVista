import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/BackDrop";
import { CgMenuRight } from "react-icons/cg";
import logo from "../../../assets/travelVistaLogo.png";
import SearchBar from "../../../Main Component/SearchBar";

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
        <h1 className="main-navigation__title">
          <Link to="/">
            <img className="h-[30px]" alt="log" src={logo} />
            {/* TravelVista */}
          </Link>
        </h1>
        <SearchBar
          styles="sm:w-3/4 md:w-1/2 md:max-w-[450px] sm:h-[55px] hidden md:block"
          inputStyles="block w-full h-full rounded-full border-0 py-1.5 bg-[#F4F5FB] pl-10 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
