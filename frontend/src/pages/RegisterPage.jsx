import React, { useEffect } from "react";
import Register from "../components/Register";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);
  return (
    <div className="flex">
    <Sidebar />
    <div
      className="flex  flex-col w-full border bg-gray-50  h-[
    100vh]"
    >
      <Navbar />
      <div className="p-4 space-y-6">
        
       <Register/>
      </div>
    </div>
  </div>

  );
};

export default RegisterPage;
