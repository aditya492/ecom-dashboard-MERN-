import React, { useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

export default function () {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    //  <Navigate to="/signup"/>
    navigate("/signup");
  };

  return (
    <div>
      <img className="Toplogo" alt="logo" src={'https://png.pngitem.com/pimgs/s/121-1218652_inquiries-go-here-electroneum-bazaar-hd-png-download.png'}/>
      <ul className="nav-ui">
        {auth ? (
          <ul className="nav-ui">
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/">Add Product</Link>
            </li>
            {/* <li>
              <Link to="/update">Update Product</Link>
            </li> */}
            <li>
              <Link to="/profile">profile</Link>
            </li>
            <li>
              <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-ui rightside">
            <li>
              <Link to="/signup">
                <button className="signupButton">SignUp</button>
              </Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}
