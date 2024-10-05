import axios from "axios";
import { useEffect, useState } from "react";
import { Card, message, Result } from "antd";
import { Link, useParams } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;
export default function HomePage() {
  const { category } = useParams();
  message.config({
    duration: 2,
  });
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/products`);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
        message.error(err.message);
      }
    };
    const byCategory = async () => {
      const response = await axios.get(
        `${url}/api/products/category?keyword=${category}`
      );
      setProducts(response.data);
    };
    if (!category)  fetchData();
     else  byCategory();
  }, [category]);

  const addToCart = async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        await axios.get(`${url}/api/carts/${id}/1`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Product added successfully");
      } else message.error("Please log in");
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-2 place-items-center mt-10">
        {products &&
          products.map((prod, index) => {
            return (
              <Card
                hoverable
                style={{
                  width: 280,
                  zIndex: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                cover={
                  <Link  to={
                    location.pathname === "/"
                      ? `products/${prod.id}`
                      : `${location.pathname.split("/")[0]}/products/${prod.id}`
                  }>
                    <img
                      alt="example"
                      src={prod.imageUrl}
                      className="h-[200px]"
                    />
                  </Link>
                }
                key={index}
              >
                <Link
                  to={
                    location.pathname === "/"
                      ? `products/${prod.id}`
                      : `${location.pathname.split("/")[0]}/products/${prod.id}`
                  }
                  className="hover:text-inherit text-inherit no-underline  font-bold text-xl"
                >
                  <div>{prod.name.toUpperCase()}</div>
                </Link>
                <Link
                  to={
                    location.pathname === "/"
                      ? `products/${prod.id}`
                      : `${location.pathname.split("/")[0]}/products/${prod.id}`
                  }
                  className="hover:text-inherit text-inherit no-underline font-semibold"
                >
                  <div>~{prod.brand}</div>
                </Link>

                <Link
                  to={
                    location.pathname === "/"
                      ? `products/${prod.id}`
                      : `${location.pathname.split("/")[0]}/products/${prod.id}`
                  }
                  className=" hover:text-inherit text-inherit no-underline  font-bold"
                >
                  <div>${prod.price}</div>
                </Link>

                {prod && prod.available && (
                  <div
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-blue-800 text-gray-200 shadow hover:bg-blue-900 h-8 w-44"
                    onClick={() => addToCart(prod.id)}
                  >
                    Add to cart
                  </div>
                )}
                {prod && !prod.available && (
                  <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-blue-800 text-gray-200 shadow hover:bg-blue-900 h-8 w-44 ">
                    Out of stock
                  </div>
                )}
              </Card>
            );
          })}
      </div>
      {products.length == 0 && <Result title="No products available" />}
    </>
  );
}
