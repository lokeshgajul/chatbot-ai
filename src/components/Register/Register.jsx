import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const baseUrl = "http://localhost:3000";
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

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
        alert("User registered successfully");
      } else {
        console.log("Unexpected response format:", data);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setError("");
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <form onSubmit={registerUser}>
      <div className="">
        <div className="m-4">
          <h2 className="font-bold tracking-wider text-left">Converse AI</h2>
        </div>
        <div className="flex justify-center container mx-auto mt-14 items-center flex-col ">
          <div className="w-1/2 shadow-xl hover:shadow-2xl border-[1px] border-gray-400 rounded-md p-6  ">
            <div className=" items-center">
              <p className="text-center text-black font-bold tracking-wide pb-1">
                CREATE ACCOUNT
              </p>
            </div>
            <div>
              <input
                type="name"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter name "
                className="w-full p-2 border-[1.5px] hover:border-blue-300 rounded-[3px] focus:outline-none mt-3"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email "
                className="w-full p-2 border-[1.5px] hover:border-blue-300 rounded-[3px] focus:outline-none mt-3"
              />
            </div>
            <div>
              <input
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password "
                className="w-full p-2 border-[1.5px] hover:border-blue-300 rounded-[3px] focus:outline-none mt-3"
              />
            </div>
            <div className="w-full mt-4">
              <button
                type="submit"
                className="py-2 bg-black w-full rounded text-blue-50 font-bold hover:bg-blue-700"
              >
                SIGN UP
              </button>
            </div>

            <div
              className="flex flex-row justify-end items-end text-black text-right pt-3 text-[13px]"
              // onClick={() => navigate("/login")}
            >
              <p>Already have an Account ? </p>
              <p
                className="hover:text-blue-800 font-semibold ml-1 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login here
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
      </div>
    </form>
  );
}

export default Register;
