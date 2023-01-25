import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";
import countryList from "react-select-country-list";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { db } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../components/UI/Loader"

const CheckOut = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const options = useMemo(() => countryList().getData(), []);

  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterPhone, setEnterPhone] = useState("");
  const [enterStreetAddress, setEnterStreetAddress] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [enterPostalCode, setEnterPostalCode] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const countryListHandler = (enterCountry) => {
  //   setEnterCountry(enterCountry);
  // };

  const submitOrders = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await collection(db, "orders");
      await addDoc(docRef, {
        customerName: enterName,
        email: enterEmail,
        phone: enterPhone,
        streetAddress: enterStreetAddress,
        city: enterCity,
        postalCode: enterPostalCode,
        country: enterCountry,
        totalQty: totalQty,
        subTotal: totalAmount,
        totalCost: totalAmount,
      });
      setLoading(false);
      toast.success("Your order submited successfully");
      navigate("/shop");
    } catch (error) {}
  };

  return (
    <Helmet title="CheckOut">
      <CommonSection title="CheckOut" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              {loading ? <Loader /> : <>
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form" onSubmit={submitOrders}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="inputf"
                    value={enterName}
                    onChange={(e) => setEnterName(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="inputf"
                    value={enterEmail}
                    onChange={(e) => setEnterEmail(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <PhoneInput
                    className="phn__select"
                    country="et"
                    placeholder="Enter your phone number"
                    enableSearch={true}
                    value={enterPhone}
                    onChange={(phone) => setEnterPhone(phone)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Streeet Address"
                    className="inputf"
                    value={enterStreetAddress}
                    onChange={(e) => setEnterStreetAddress(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    className="inputf"
                    value={enterCity}
                    onChange={(e) => setEnterCity(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="inputf"
                    value={enterPostalCode}
                    onChange={(e)=>setEnterPostalCode(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <Select
                    className="country__list"
                    options={options}
                    value={enterCountry}
                    onChange={(country)=>setEnterCountry(country)}
                    placeholder="Select your country... "
                  />
                </FormGroup>
              </Form>
                
              </>}
             
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
                <motion.button
                  type="submit"
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn auth__btn checkout__btn w-100"
                  onClick={submitOrders}
                >
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
