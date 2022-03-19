import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const params =useParams();
  const navigate=useNavigate();



useEffect(()=>{
getProductDetail();
},[])

const getProductDetail=async()=>{
  let result=await fetch(`http://localhost:5000/product/${params.id}`)
  result=await result.json();
  setName(result.name);
  setCategory(result.category);
  setPrice(result.price);
  setCompany(result.company)
}

   
  const updateProduct = async () => {
   let result=await fetch(`http://localhost:5000/product/${params.id}`,{
       method:'put',
       body:JSON.stringify({name,price,category,company}),
       headers:{ "Content-Type": "application/json" },
   })
//   reult will be in form of readstream so we have to convert into json
   result=await result.json();
   if(result){
        navigate(`/products`)
       await toast.success("Product Detail Updated!")

   }
  };

  return (
      <>
    <div className="product">
      <h1>Update Product</h1>
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

      <button onClick={updateProduct} className="signupButtonPage">
        Update Product
      </button>
    </div>
    <ToastContainer/>
    </>
  );
}
