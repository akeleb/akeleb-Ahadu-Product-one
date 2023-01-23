import React from "react";
import { Container, Row } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";
import logo from "../assets/images/logo-transparent.png";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];
const AdminNav = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/home");
  };

  const { currentUser } = useAuth();
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <Row>
              <div className="admin__nav-wrapper-top">
                <div className="logo" onClick={navigateToHome}>
                  <img src={logo} alt="" />
                  <h2>HulumFurniture</h2>
                </div>
                <div className="search__box">
                  <input type="text" placeholder="search...." />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
                <div className="admin__nav-top-right">
                  <span>
                    <i className="ri-notification-3-line"></i>
                  </span>
                  <span>
                    <i className="ri-settings-3-fill"></i>
                  </span>
                  <img src={currentUser && currentUser.photoURL} alt="" />
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item,index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink to={item.path} className={navClass=>navClass.isActive? "active__admin-menu":""}>{item.display}</NavLink>
                  </li>
                ))}
              
              </ul>
              
            </div>
          </Row>
        </Container>
        
      </section>
    </>
  );
};

export default AdminNav;
