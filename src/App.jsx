import React from "react";
import "./App.css";
import Chat from "./components/chat/chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { ThemeProvder } from "./Context/ThemeContext";
import QA from "./components/QA/Qa";

function App() {
  return (
    <ThemeProvder>
      <BrowserRouter>
        <div className="flex min-h-screen">
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
        </div>
      </BrowserRouter>
    </ThemeProvder>
  );
}

export default App;
