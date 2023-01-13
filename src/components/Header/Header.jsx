import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/images/custom-logo.jpg";
import userIcon from "../../assets/images/user-icon.png";

import "./header.css";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";

const nav__links = [
  {
    path: "home",
    Display: "Home",
  },
  {
    path: "shop",
    Display: "Shop",
  },
  {
    path: "cart",
    Display: "Cart",
  },
];
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Hulum-Furniture-Store</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.Display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icons">
                {" "}
                <i className="ri-heart-fill"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart__icons">
                <i className="ri-shopping-bag-fill"></i>
                <span className="badge">1</span>
              </span>
              <span>
                <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
              </span>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};
export default Header;