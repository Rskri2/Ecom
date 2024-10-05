import { ArrowRightOutlined } from "@ant-design/icons";
import { 
  InputNumber, message, Result, 
} from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cost, setCost] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${url}/api/carts`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          let sum = 0;
          response.data.map((p) => {
            if (p.product.available)
              sum = sum + parseInt(p.product.price) * parseInt(p.quantity);
          });
          setCost(sum);
          setProducts(response.data);
        } else message.error("Please log in");
      } catch (err) {
        message.error(err.message);
      }
    };
    fetchData();
  }, []);

  const deleteFromCart = async (id) => {
    
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        await axios.delete(`${url}/api/carts/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Product removed successfully");
      } else message.error("Please log in");
    } catch (err) {
      message.error(err.message);
    }
  };
  const updateItemsInCart = async (qty, id) => {

    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        await axios.put(`${url}/api/carts/${id}/${qty}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else message.error("Please log in");
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <>
      <section className="bg-white py-8 antialiasedmd:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold sm:text-2xl text-center">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {products.map((p) => (
                <div className="space-y-6" key={p.id}>
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link to="/" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20 "
                          src={p.product.imageUrl}
                          alt="imac image"
                        />
                      </Link>

                      <label htmlFor="counter-input" className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <InputNumber min={1} name="quantity" value={p.quantity} onChange={(value)=>updateItemsInCart(value, p.id)}/>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 ">
                            &#8377;{p.product.price}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link
                          to={`${location.pathname.split("/")[0]}/products/${
                            p.product.id
                          }`}
                          className="text-base font-medium text-gray-900 hover:underline "
                        >
                          {p.product.name}
                        </Link>{" "}
                        <Link
                          to={`${location.pathname.split("/")[0]}/products/${
                            p.product.id
                          }`}
                          className="text-base font-medium text-gray-900 hover:underline "
                        >
                          {p.product.description}
                        </Link>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() => deleteFromCart(p.id)}
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                          {!p.product.available && (
                            <div
                              className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-700-500"
                              onClick={() => deleteFromCart(p.id)}
                            >
                              Out of stock
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {products.length == 0 && <Result title="No items in the cart" />}
              {products.length > 0 && (
                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                    <p className="text-xl font-semibold text-gray-900 ">
                      Order summary
                    </p>

                    <div className="space-y-4">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>&#8377;{cost}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        to="/"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        or{" "}
                      </span>
                      <Link
                        to="/"
                        title=""
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                      >
                        Continue Shopping
                        <ArrowRightOutlined />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
