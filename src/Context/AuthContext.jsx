import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useState(true);
  const baseUrl = "http://localhost:3000";

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
    console.log(msg);
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/register`,
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.response) {
        console.log("user credentials ", data.response.token);
        localStorage.setItem("userToken", data.response.token);
        handleSuccess(response.data.message);
      } else {
        console.log("Unexpected response format:", data);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setError("");
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const data = await response.data;
      if (data.success) {
        handleSuccess(data.message);
        setAuth(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  const value = {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    error,
    setError,
    registerUser,
    loginUser,
    auth,
    handleSuccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const Authhook = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Context is undefined ");
  }
  return context;
};

export default Authhook;
