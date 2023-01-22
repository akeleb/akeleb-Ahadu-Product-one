import React from "react";
import { Spinner } from "reactstrap";
import "../../styles/loader.css";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
     className="loader-spiner"
    >
     Loading...
    </Spinner>
  );
};

export default Loader;
