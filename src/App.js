import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<AddProduct/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/update/:id" element={<UpdateProduct/>}></Route>
          <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
          <Route
            path="/profile"
            element={<h1>Profile Product Page</h1>}
          ></Route>
          </Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="*" element={<h1 style={{textAlign:'center'}}>404 Page Not Found !</h1>}></Route>

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
