import React from "react";
import { toast } from "react-toastify";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetdata";
import Loader from "../components/UI/Loader";
import useAuth from "../custom-hooks/useAuth";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const Users = () =>
{
  const { currentUser } = useAuth();
    const { data: usersData, loading } = useGetData("Users");
    
    const deleteUser = async (id) =>
    {
      if (currentUser.email === "akelebch12@gmail.com")
      {
        await deleteDoc(doc(db, "Users", id));
        toast.success("User deleted successfully");
      }
      else
      {
        toast.warning("You are not authorized to do this")
       }
    }
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
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td><Loader/></td></tr>
                ) : (
                  usersData.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt=""></img>
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td><button className="btn btn-danger" onClick={() => {
                            deleteUser(user.uid);
                          }}>Delete</button></td>
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

export default Users;
