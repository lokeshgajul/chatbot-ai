import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Chat from "../chat/chat";
import About from "../About/About";
import Register from "../Register/Register";
import Login from "../Login/Login";
import QA from "../QA/Qa";
import Authhook from "../../Context/AuthContext";

const Auth = () => {
  const { token } = Authhook();
  const [authToken, setAuthToken] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getToken = localStorage.getItem("authToken");
    setAuthToken(getToken);
    setLoading(false);
  }, [token]);

  return (
    <BrowserRouter>
      {loading ? (
        <div className="flex justify-center items-center">
          <p>Loading....</p>
        </div>
      ) : authToken ? (
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-grow">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Chat" element={<Chat />} />
              <Route path="/Qa" element={<QA />} />
              <Route path="/about-us" element={<About />} />
              {/* <Route path="/register" element={<Register />} /> */}
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Auth;
