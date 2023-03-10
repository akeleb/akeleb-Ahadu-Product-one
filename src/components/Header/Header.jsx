import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";

import logo from "../../assets/images/logo-transparent.png";
import userIcon from "../../assets/images/user-icon.png";

import "./header.css";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

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

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/home");
        toast.success("Loged out successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("show__Profileactions");
  };
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
                <span className="badge">5</span>
              </span>
              <span className="cart__icons" onClick={navigateToCart}>
                <i className="ri-shopping-bag-fill"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className="profile__action"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                     <Link to="#" onClick={logout}>Logout</Link>
                      {currentUser.email === "akelebch12@gmail.com" ? (
                        <Link to="/dashboard">Dashboard</Link>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <span>{currentUser ? currentUser.displayName : ""}</span>
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
