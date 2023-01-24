import React, { useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import "../styles/login.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const naviate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          //update user profile
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });
          //store user data in firestre database
          await setDoc(doc(db, "Users", user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });
        });
      });
      setLoading(false);
      toast.success("Account created successfully");
      naviate("/shop");
    } catch (error) {
      setLoading(false);
        toast.error("We found an account with this email");
     
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading......</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Signup</h3>
                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter Your Password"
                      value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                  </FormGroup>
                    <FormGroup className="form__group">
                      <span style={{color:"white"}}>Upload profile picture</span>
                    <input
                        type="file"
                        placeholder="Upload profile picture"
                        onChange={(e) => setFile(e.target.files[ 0 ])}
                        required
                    />
                  </FormGroup>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn auth__btn"
                  >
                    Create an Account
                  </motion.button>
                  <p>
                    Already have an account?
                    <Link to="/login">Logoin</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default SignUp;
