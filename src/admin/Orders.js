import React from "react";
import { toast } from "react-toastify";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetdata";
import Loader from "../components/UI/Loader";
import useAuth from "../custom-hooks/useAuth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const Orders = () => {
  const { currentUser } = useAuth();
  const { data: ordersData, loading } = useGetData("orders");

  const deleteOrder = async (id) => {
    if (currentUser.email === "akelebch12@gmail.com") {
      await deleteDoc(doc(db, "orders", id));
      toast.success("Order deleted successfully");
    } else {
      toast.warning("You are not authorized to do this");
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td>
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  ordersData.map((order) => (
                    <tr key={order.id}>
                      <td>{order.customerName}</td>
                      <td>{order.email}</td>
                      <td>{order.phone}</td>
                      <td>{order.city}</td>
                      <td>{order.streetAddress}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteOrder(order.id);
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

export default Orders;
