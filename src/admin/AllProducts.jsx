import React from "react";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import useGetData from "../custom-hooks/useGetdata";
import Loader from "../components/UI/Loader";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import useAuth from "../custom-hooks/useAuth";



const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");
  const { currentUser } = useAuth();

  const deleteProduct = async (id) =>
  {
    if (currentUser.email === "akelebch12@gmail.com")
    {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted successfully");
    } else
    {
      toast.warning("You are not authorized to do this");
    }
   
   
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td>
                      <Loader className="py-5" />
                    </td>
                  </tr>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
