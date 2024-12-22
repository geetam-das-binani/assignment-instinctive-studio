import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import { useSelector } from "react-redux";

const LoginPage = () => {
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
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
