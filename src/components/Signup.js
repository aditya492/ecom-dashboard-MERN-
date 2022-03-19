import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


export default function Signup() {
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
 
  const handleSubmit = async() => {
    if (name && email && password) {
      setError(false);
      let result=await fetch('http://localhost:5000/register',{
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
          'Content-type':'application/json'
        }
      })
      result=await result.json();
      localStorage.setItem("user",JSON.stringify(result));
      if(result){
        navigate('/')
      } 
    } else {
      setError(true);
    }
    console.log(name, email, password);
  };

  return (
    <div style={{ marginLeft: "34%" }}>
      <h1>Register/SignUp</h1>
      <input
        className="inputBox"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
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
        Sign Up
      </button>
      <div>
        {error && (
          <span style={{ color: "red" }}>Please Enter All Credentials</span>
        )}
      </div>
      <ToastContainer/>

    </div>
  );
}
