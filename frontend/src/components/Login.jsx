import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  message.config({
    duration: 2,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {username, password});
      window.localStorage.setItem("token", res.data);
      message.success("Logged in successfully")
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <>
      <div className=" lg:grid lg:min-h-screen lg:grid-cols-12  pl-20 pt-24 w-full">
        <section className="relative flex bg-white lg:col-span-5  xl:col-span-5  items-center justify-self-center">
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
        <main className=" flex items-center justify-center lg:col-span-7  xl:col-span-6 bg-white">
          <div className=" flex items-center justify-center lg:col-span-7 l xl:col-span-6 absolute top-28  bg-white w-3/12">
            <div className="w-full">
              <Link className="block text-black" to="/">
                <span className="sr-only">Home</span>
                <div className="flex justify-center"></div>
              </Link>
              <div className="text-2xl font-bold flex justify-center text-gray-900 sm:text-3xl md:text-4xl mt-[100px]">
                Welcome back
              </div>

              <div className="mt-4 text-xl leading-relaxed flex justify-center text-gray-500">
                Please login to your account
              </div>

              <form
                className="mt-8 grid grid-cols-3 gap-3 "
                onSubmit={handleLogin}
              >
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                   <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="Ram Kumar"
                  required
                  onChange={(e) => setusername(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
                />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={password}
                    required
                    placeholder="••••••••"
                    onChange={(e) => setpassword(e.target.value)}
                    className="mt-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 w-full "
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-gray-500 w-full"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
