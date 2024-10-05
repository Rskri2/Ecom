import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export default function Register() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/register`, { name, password });
      window.localStorage.setItem("token", res.data);
      message.success("User registeed successfully");
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div className="lg:grid min-h-screen lg:min-h-screen lg:grid-cols-12  pl-20 pt-20 relative">
      <section className="relative flex  items-center justify-center bg-yellow-50 lg:col-span-5  xl:col-span-5 min-h-screen">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="hidden lg:relative lg:block lg:p-12">
          <Link className="block text-white" to="/">
            <span className="sr-only">Home</span>
          </Link>
        </div>
      </section>

      <div className="flex items-center justify-center lg:col-span-7 xl:col-span-6 bg-white w-full">
        <div className="flex items-center justify-center  py-2 sm:px-12 lg:col-span-7  lg:py-6 xl:col-span-6 absolute top-20  w-4/12 ">
          <div className="max-w-md lg:max-w-3xl flex items-center flex-col ">
            <Link className="block text-blue-600" to="/">
              <span className="sr-only">Home</span>
            </Link>
            <form
              className="mt-8 grid grid-cols-3 gap-3"
              onSubmit={handleLogin}
            >
              <div className="col-span-6 ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Ram Kumar"
                  required
                  onChange={(e) => setname(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
                />
              </div>

              <div className="col-span-6 ">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm h-6"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events and product updates
                  </span>
                </label>
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-gray-500 w-full"
                >
                  Create an account
                </button>
              </div>

              <div className="col-span-6 sm:flex sm:items-center text-center w-full">
                <p className="mt-4 text-sm text-gray-500 sm:mt-0 text-center w-full">
                  Already have an account?
                  <Link to="/login" className="text-gray-700 underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
