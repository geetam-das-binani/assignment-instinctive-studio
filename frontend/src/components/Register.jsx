import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../reducers/userReducer";
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "../common/InputField";
import { baseUrl } from "../constants/constant";

const Register = () => {
  const { loading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password || !userData.name) {
      alert("Please fill all the fields");
      return;
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${baseUrl}/api/v1/register-user`,
        {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          imageUrl: userData.imageUrl,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { data: response } = res;
      console.log(response);
      if (response.success) {
        dispatch(setUser(response.user));
        navigate("/");
        toast.success("Registered successfully", {
          icon: "✅",
        });
      } else {
        toast.error(response.message || "Something went wrong");
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
      onSubmit={handleRegister}
      className="max-w-md p-6 mx-auto mt-8 shadow-lg rounded-xl "
    >
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      <Link className="text-blue-500" to={"/login"}>
        Already have an account ?
      </Link>

      <InputField
        label="Name"
        id="name"
        name="name"
        value={userData.name}
        placeholder="Enter your name"
        onChange={(e) =>
          setUserData({ ...userData, [e.target.name]: e.target.value })
        }
        required={true}
      />
      <InputField
        label="Email"
        id="email"
        type="email"
        name="email"
        value={userData.email}
        placeholder="example@domain.com"
        onChange={(e) =>
          setUserData({ ...userData, [e.target.name]: e.target.value })
        }
        required={true}
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        name="password"
        value={userData.password}
        placeholder="********"
        onChange={(e) =>
          setUserData({ ...userData, [e.target.name]: e.target.value })
        }
        required={true}
      />
      <InputField
        label="Image URL"
        id="imageUrl"
        name="imageUrl"
        value={userData.imageUrl}
        placeholder="Link to your image"
        onChange={(e) =>
          setUserData({ ...userData, [e.target.name]: e.target.value })
        }
        required={true}
      />
      {userData.imageUrl && (
        <div className="mb-5">
          <img
            className="object-cover w-20 h-20 rounded-md"
            src={userData.imageUrl}
            alt="preview image"
          />
        </div>
      )}
      <button
        type="submit"
        className="text-white flex items-center justify-center bg-gray-500 hover:bg-gray-400 font-medium rounded-lg text-sm w-full px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-solid rounded-full animate-spin border-r-transparent"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default Register;
