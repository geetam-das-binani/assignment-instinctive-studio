import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { setLoading, setUser } from "../reducers/userReducer";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../common/InputField";
import { baseUrl } from "../constants/constant";

const ProfileForm = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    imageUrl: user?.imageUrl || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.imageUrl || !userData.name) {
      toast.error("Please fill all the fields", { icon: "❌" });
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${baseUrl}/api/v1/update-user`,
        {
          email: userData.email,
          name: userData.name,
          imageUrl: userData.imageUrl,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { data: response } = res;

      if (response.success) {
        dispatch(setUser(response.user));
        toast.success("Updated successfully", { icon: "✔️" });
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        icon: "❌",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
    onSubmit={handleUpdate}
    className="max-w-md p-6 mx-auto mt-8 shadow-lg rounded-xl"
  >
    <h2
      onClick={() => navigate("/")}
      className="flex items-center gap-2 mb-4 text-2xl font-bold hover:cursor-pointer"
    >
      <FaArrowLeft />
      Profile
    </h2>

    <InputField
      label="Name"
      id="name"
      name="name"
      type="text"
      placeholder="Name..."
      value={userData.name}
      onChange={(e) =>
        setUserData({ ...userData, [e.target.name]: e.target.value })
      }
      required={true}
    />

    <InputField
      label="Email"
      id="email"
      name="email"
      type="email"
      placeholder="example@domain.com"
      value={userData.email}
      onChange={(e) =>
        setUserData({ ...userData, [e.target.name]: e.target.value })
      }
      required={true}
    />

    <InputField
      label="Image URL"
      id="image"
      name="imageUrl"
      type="text"
      placeholder="Image URL..."
      value={userData.imageUrl}
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
          alt="Preview"
        />
      </div>
    )}

    <button
      type="submit"
      disabled={loading}
      className="text-white flex items-center justify-center bg-gray-500 hover:bg-gray-400 font-medium rounded-lg text-sm w-full px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-solid rounded-full animate-spin border-r-transparent"></div>
      ) : (
        "Update"
      )}
    </button>
  </form>
  );
};

export default ProfileForm;
