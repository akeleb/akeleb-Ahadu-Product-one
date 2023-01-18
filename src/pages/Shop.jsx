import React, { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/Shop.css";

import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";

const Shop = () => {
  const [ productsData, setProductsData ] = useState(products);
  const handleFilter = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "sofa") {
      const filteredProducts = products.filter(
        (item) => item.category === "sofa"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "bed") {
      const filteredProducts = products.filter(
        (item) => item.category === "bed"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "wardrobe") {
      const filteredProducts = products.filter(
        (item) => item.category === "wardrobe"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "chair") {
      const filteredProducts = products.filter(
        (item) => item.category === "chair"
      );
      setProductsData(filteredProducts);
    }
    if (filterValue === "table") {
      const filteredProducts = products.filter(
        (item) => item.category === "table"
      );
      setProductsData(filteredProducts);
    }
  };

  const handlSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  const handlSort = (e) => {
    const sortValue = e.target.value;
    if (sortValue === "ascending")
    {
      const sortedProducts= products.sort((a, b) => a.productName.localeCompare(b.productName))
      setProductsData(sortedProducts);
    }
    if (sortValue === "descending") {
      const sortedProducts= products.sort().reverse((a, b) => b.productName.localeCompare(a.productName))
      setProductsData(sortedProducts);
    }
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="chair">Chair</option>
                  <option value="sofa">Sofa</option>
                  <option value="bed">Bed</option>
                  <option value="wardrobe">Wardrobe</option>
                  <option value="table">Table</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select onChange={handlSort}>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search..........."
                  onChange={handlSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No products are found!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
