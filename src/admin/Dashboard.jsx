import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";
import useGetData from "../custom-hooks/useGetdata"


const Dashboard = () =>
{
  const { data: products } = useGetData("products")
  const { data: Users } = useGetData("Users")
  return (
    <section>
      <Container>
        <Row>
          <Col className="lg-3">
            <div className="revenue__box">
              <h5>Total sales</h5>
              <span>20000 ETB</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="orders__box">
              <h5>Orders</h5>
              <span>20000 ETB</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="products__box">
              <h5>Total products</h5>
              <span>{products.length }</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="users__box">
              <h5>Total users</h5>
              <span>{Users.length }</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
