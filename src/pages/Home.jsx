import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import heroImg from "../assets/images/hero-img.png";
import "../styles/Home.css";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";

import counterImg from "../assets/images/counter-timer-img.png";
import useGetData from "../custom-hooks/useGetdata";
import Loader from "../components/UI/Loader";

const Home = () => {
  const { data: products, loading } = useGetData("products");

  const [tredingProducts, setTredingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [bedProducts, setBedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair" ||item.category === "table"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );
    const filteredBedProducts = products.filter(
      (item) => item.category === "bed" ||item.category === "wardrobe"
    );
    const filteredPopularProducts = products.filter(
      (item) => item.shortDesc === "popular"
    );

    setTredingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setBedProducts(filteredBedProducts);
    setPopularProducts(filteredPopularProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Furniture Shoping a Wonderful Experience!</h2>
                <p>???????????? ??????????????? ???????????? ????????? ?????? ????????????!</p>
                <p>Give your home extra beauty!</p>
                <motion.button whileTap={{ scale: 1.2 }} className="Buy__btn">
                  <Link to="/shop">Shop Now</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt=""></img>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? <Loader /> : <ProductsList data={tredingProducts}/>}
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            {loading ? <Loader /> : <ProductsList data={bestSalesProducts} />}
            {/* <ProductsList data={bestSalesProducts} /> */}
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="6" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Vist Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">New Arivals</h2>
            </Col>
            {loading ? <Loader /> : <ProductsList data={bedProducts} />}
            {/* <ProductsList data={bedProducts} /> */}
           
            {/* <ProductsList data={wardrobeProducts} /> */}
          </Row>
        </Container>
      </section>
      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular products</h2>
            </Col>
            {loading ? <Loader /> : <ProductsList data={popularProducts} />}
            {/* <ProductsList data={popularProducts} /> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Home;
