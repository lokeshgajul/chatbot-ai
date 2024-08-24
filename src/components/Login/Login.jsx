import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authhook from "../../Context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [error, setError] = useState("");

  const { email, setEmail, password, setPassword, loginUser } = Authhook();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    await loginUser();
    navigate("/");
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="m-4">
        <h2 className="font-bold tracking-wider text-left">Converse AI</h2>
      </div>
      <div className="flex justify-center container mx-auto mt-14 items-center flex-col ">
        <div className="w-1/2 shadow-xl hover:shadow-2xl border-[1px] border-gray-400 rounded-md p-6 ">
          <div className=" items-center">
            <p className="text-center text-black font-bold tracking-wide pb-1">
              LOGIN
            </p>
          </div>

          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email "
              className="w-full p-2 border-[1.5px] hover:border-blue-300 rounded-sm focus:outline-none mt-3"
            />
          </div>
          <div>
            <input
              name="password"
              id="password"
              placeholder="Enter password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-[1.5px] hover:border-blue-300 rounded-sm focus:outline-none mt-3"
            />
          </div>
          <div className="w-full mt-4">
            <ToastContainer />
            <button
              type="submit"
              className="py-2 bg-black w-full rounded text-blue-50 font-bold hover:bg-blue-700"
            >
              LOG IN
            </button>
          </div>

          <div
            className="flex flex-row justify-end items-end text-black text-right pt-3 text-[13px]"
            // onClick={() => navigate("/login")}
          >
            <p>Dont have an Account? </p>
            <p
              className="hover:text-blue-800 font-semibold ml-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Signup here
            </p>
          </div>
        </div>

        {error && (
          <div className="w-3/4 mb-2">
            <div
              className=" border-l-4 border-orange-500 text-orange-700 p-1 text-[15px] "
              role="alert"
            >
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
