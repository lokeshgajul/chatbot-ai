import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: "bottom-right",
    });
  };

  return (
    <div>
      {" "}
      <ToastContainer />
      <button onClick={showToastMessage} className="">
        Toast
      </button>
    </div>
  );
};

export default About;
