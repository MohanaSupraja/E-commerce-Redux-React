import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavbarPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
const customContainerStyle = {
  marginTop: "50px", // Adjust the margin
};
export default function RouteLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        style={customContainerStyle}
      />
    </>
  );
}
