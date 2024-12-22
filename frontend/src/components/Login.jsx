import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../reducers/userReducer";
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "../common/InputField";
import { baseUrl } from "../constants/constant";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!data.email || !data.password) {
        alert("Please fill all the fields");
        return;
      }

      dispatch(setLoading(true));
      const res = await axios.post(
        `${baseUrl}/api/v1/login-user`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { data: response } = res;

      if (response.success) {
        dispatch(setUser(response.user));
        toast.success("Login successful", { icon: "✅" });
        navigate("/");
      } else {
        toast.error(response.message || "Something went wrong", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message || "Something went wrong", {
        icon: "❌",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md p-6 mx-auto mt-8 shadow-lg rounded-xl "
    >
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <Link className="text-blue-500" to={"/register"}>
        Don't have an account?
      </Link>
      <InputField
        label="Email"
        id="email"
        type="email"
        name="email"
        value={data.email}
        placeholder="example@domain.com"
        onChange={(e) =>
          setData({ ...data, [e.target.name]: e.target.value })
        }
        required={true}
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        name="password"
        value={data.password}
        placeholder="********"
        onChange={(e) =>
          setData({ ...data, [e.target.name]: e.target.value })
        }
        required={true}
      />

      <button
        type="submit"
        className="text-white flex items-center justify-center bg-gray-500 hover:bg-gray-400 font-medium rounded-lg text-sm w-full px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <div className="w-4 h-4 border-2 border-current border-solid rounded-full animate-spin border-r-transparent"></div>  : "Login"}
      </button>
    </form>
  );
};

export default Login;
