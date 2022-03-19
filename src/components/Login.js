import React, { useEffect, useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const navigate=useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  })


  const handleSubmit = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result=await result.json();

    if(result.name){
        toast.success("Logged in")
localStorage.setItem("user",JSON.stringify(result));
 navigate('/')
}
    else{
       toast.error("Invalid Cred / User Not Found")
    }
  };

  return (
      <>
    <div style={{ marginLeft: "34%" }}>
      <h1>Login</h1>
      <input
        className="inputBox"
        value={email}
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={handleSubmit} type="submit" className="signupButtonPage">
        Login
      </button>
      <div>
        {error && (
          <span style={{ color: "red" }}>Please Enter All Credentials</span>
        )}
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}
