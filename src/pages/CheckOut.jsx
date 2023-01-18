import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";

const CheckOut = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="CheckOut">
      <CommonSection title="CheckOut" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Eneter Your Name" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="email" placeholder="Eneter Your Email" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="phone" placeholder="Phone Number" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Streeet Address" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="City" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Postal Code" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Quantity: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>{totalAmount} Birr</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br />
                    Free shipping
                  </span>{" "}
                  <span>0 Birr</span>
                </h6>

                <h4>
                  Total cost: <span>{totalAmount} Birr</span>
                </h4>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn auth__btn checkout__btn w-100">
                  place your order
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CheckOut;
