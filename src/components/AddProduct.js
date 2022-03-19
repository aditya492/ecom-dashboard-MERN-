import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const navigate=useNavigate();
  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    if(result){
        toast.success("Product Added!");
        navigate('/products');
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
      />
      {error && !name && <span className="errorClass">Enter Valid Name!</span>}
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="text"
        placeholder="Enter Product Price"
        className="inputBox"
      />
      {error && !price && (
        <span className="errorClass">Enter Valid Price!</span>
      )}

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        placeholder="Enter Product Category"
        className="inputBox"
      />
      {error && !category && (
        <span className="errorClass">Enter Valid Category!</span>
      )}

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        type="text"
        placeholder="Enter Product Company"
        className="inputBox"
      />
      {error && !company && (
        <span className="errorClass">Enter Valid Company!</span>
      )}

      <button onClick={addProduct} className="signupButtonPage">
        Add Product
      </button>
      <ToastContainer/>
    </div>
  );
}
