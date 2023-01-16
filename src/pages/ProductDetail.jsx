import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductsList from "../components/UI/ProductsList";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/product-detail.css";

const ProductDetail = () => {
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);

  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__detail">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-3">
                  <div>
                    <span onClick={() => setRating(1)}>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setRating(2)}>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setRating(3)}>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setRating(4)}>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setRating(5)}>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span> Ratings)
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB
                  </span>
                  <span>Category: {category.toUpperCase()}</span>
                </div>
                <p className="mt-3">{description}</p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="#">Add to Cart</Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-3">
                <h6
                  className={`${tab === "desc" ? "activ__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "activ__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>Akele Belay</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>leave your experience</h4>
                      <form action="">
                        <div className="form__group">
                          <input type="text" placeholder="Enter Name" />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5">
                          <span onClick={() => setRating(1)}>
                            1<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(2)}>
                            2<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(3)}>
                            3<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(4)}>
                            4<i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setRating(5)}>
                            5<i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Reviews Message"
                          />
                        </div>
                        <button className="buy__btn" type="submit">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You maight also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
