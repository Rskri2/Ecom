import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AddProduct from "./components/AddProduct";
import ProductCard from "./components/ProductCard";
import UpdateProduct from "./components/UpdateProduct";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import { Result } from "antd";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:category?"
            element={
              <div>
                <Header />
                <HomePage />
                <Footer />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <Header />
                <Login />
                <Footer />
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <div>
                <Header />
                <Cart />
                <Footer />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <Header />
                <Register />
                <Footer />
              </div>
            }
          />
          <Route
            path="/products/:id"
            element={
              <>
                <Header />
                <ProductCard />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/update-product/:id?"
            element={
              <>
                <Header />
                <UpdateProduct />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/add-product"
            element={
              <>
                <Header />
                <AddProduct />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                />

                <Footer />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
