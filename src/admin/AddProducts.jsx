import React, { useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/addProduct.css";
import Loader from "../components/UI/Loader"

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [eneterProductImg, setEnterProductImg] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    setLoading(true)
    try {
      const docRef = await collection(db, "products")
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + eneterProductImg.name}`
      );
      uploadBytesResumable(storageRef, eneterProductImg).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          //store product data in firestre database
          await addDoc(docRef, {
            productName: enterTitle,
            description: enterDescription,
            price: enterPrice,
            category: enterCategory,
            imgUrl: downloadURL,
          });
        });
      });
      setLoading(false)
      toast.success("Product successfully added");
      navigate("/dashboard/all-products")
    } catch (error)
    {
      setLoading(false)
      // console.log(error)
      toast.error("Product not added!");
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {
              loading ? <Loader/> : <>
              <h4 className="mb-4">Add Product</h4>
            <Form className="form__group" onSubmit={addProduct}>
              <FormGroup className="form__Group">
                <span>Product name</span>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={enterTitle}
                  onChange={(e) => setEnterTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__Group">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description......."
                  value={enterDescription}
                  onChange={(e) => setEnterDescription(e.target.value)}
                  required
                />
              </FormGroup>
              <div className="category_div gap-5">
                <FormGroup className="form__Group w-50">
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder="30,000 ETB"
                    value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__Group w-50">
                  <span>Category</span>
                  <select
                    className="w-100 p-2"
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                    required
                  >
                    <option value="">Select product category</option>
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="bed">Bed</option>
                    <option value="table">Table</option>
                    <option value="wardrobe">Wardrobe</option>
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup className="form__Group">
                  <span>Product Image</span>
                  <input
                    type="file"
                    onChange={(e) => setEnterProductImg(e.target.files[0])}
                    required
                  />
                </FormGroup>
              </div>
              <button className="buy__btn" type="submit">
                Add Product
              </button>
            </Form>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default AddProducts;
