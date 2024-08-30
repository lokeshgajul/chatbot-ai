import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [token, setAuthToken] = useState(false);
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
          withCredentials: true,
        }
      );

      const data = response.data;

      if (data.response) {
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
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      console.log("data.status: ", data.success);
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     const { data } = await axios.post("http://localhost:3000/VerifyUser");
  //     const { status, user } = data;
  //     setUsername(user);

  //     return status
  //       ? toast(`Hello ${user}`, {
  //           position: "top-right",
  //         })
  //       : removeCookie("token");
  //   };
  //   verifyCookie();
  // }, [cookies, removeCookie]);

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
    handleSuccess,
    token,
    setAuthToken,
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
