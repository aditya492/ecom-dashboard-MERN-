import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });

    result = await result.json();

    if (result) {
        toast.error("Deletion Successful!")
      getProducts();
    }
  };


  const searchHandle=async (e)=>{
    let key=e.target.value;
    if(key){
        let result=await fetch(`http://localhost:5000/search/${key}`);
        result=await result.json();
        if(result){
            setProducts(result);
        }
    }
    else{
        getProducts()
    }
  }

  return (
  <>
    <div className="productTable">
      <h3>Product List</h3>
      <input onChange={searchHandle} type="text" className="inputSearch" placeholder="Search Product" />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? products.map((item, index) => {
        return (
          <ul>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>{" "}
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        );
      }): <h1>No Result Found</h1>}
    </div>
    <ToastContainer/>
    </>
  );
}
