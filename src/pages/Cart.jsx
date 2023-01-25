import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();

  const navToCheckout = () =>
  {
    if (cartItems.length === 0)
    {
      toast.error("Your cart is empty. Add some products to checkout")
    }
    else
    {
      navigate("/checkout")
    }
  }
  return (
    <Helmet title="Cart">
      <CommonSection title="Shoping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">
                  No Items Added To Your Cart
                </h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">
                    {totalAmount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Birr
                  </span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                Taxes and shiping will calculate in checkout
              </p>
              <div>
                <button
                  className="buy__btn w-100"
                  onClick={navToCheckout}
                >Checkout</button>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Continue Shoping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price} ETB</td>
      <td>{item.quantity}px</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.5 }}
          className="ri-delete-bin-line"
          onClick={deleteProduct}
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
