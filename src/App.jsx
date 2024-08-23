import React, { useState } from "react";
import "./App.css";
import Chat from "./components/chat/chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { ThemeProvder } from "./Context/ThemeContext";
import QA from "./components/QA/Qa";
import Register from "./components/Register/Register";
import Login from "./Login/Login";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <ThemeProvder>
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
        {/* <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-grow">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Chat" element={<Chat />} />
              <Route path="/Qa" element={<QA />} />
              <Route path="/about-us" element={<About />} />
            
            </Routes>
          </div>
        </div> */}
      </BrowserRouter>
    </ThemeProvder>
  );
}

export default App;
