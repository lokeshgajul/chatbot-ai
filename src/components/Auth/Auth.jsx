import React, { useState } from "react";
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
  const { auth } = Authhook();
  return (
    <BrowserRouter>
      {auth ? (
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
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Auth;
