import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPostErrorLoading, setPostLoading } from "../reducers/postReducer";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import InputField from "../common/InputField";
import { baseUrl } from "../constants/constant";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      dispatch(resetPostErrorLoading());
      dispatch(setPostLoading(true));
      const res = await axios.post(`${baseUrl}/api/v1/create-post`, postData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data: response } = res;
      if (response.success) {
        toast.success("Post created successfully", { icon: "✔️" });
        setPostData({ title: "", content: "", imageUrl: "" });
        navigate("/");
      } else {
        toast.error(response?.message || "Something went wrong", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error creating post", {
        icon: "❌",
      });
    }
  };

  return (
    <form
      onSubmit={handleCreatePost}
      className="max-w-md p-6 mx-auto mt-8 shadow-lg rounded-xl"
    >
      <h2
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-4 text-2xl font-bold hover:cursor-pointer"
      >
        <FaArrowLeft />
        Add Post
      </h2>

      <InputField
        label="Title"
        id="title"
        name="title"
        type="text"
        placeholder="Title..."
        value={postData.title}
        onChange={(e) =>
          setPostData({ ...postData, [e.target.name]: e.target.value })
        }
        required={true}
      />

      <InputField
        label="Content"
        id="content"
        name="content"
        type="textarea"
        placeholder="Content..."
        value={postData.content}
        onChange={(e) =>
          setPostData({ ...postData, [e.target.name]: e.target.value })
        }
        rows={4}
        required={true}
      />

      <InputField
        label="Image URL"
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="Image URL..."
        value={postData.imageUrl}
        onChange={(e) =>
          setPostData({ ...postData, [e.target.name]: e.target.value })
        }
        required={true}   
      />

      {postData.imageUrl && (
        <div className="mb-5">
          <img
            className="object-cover w-20 h-20 rounded-md"
            src={postData.imageUrl}
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
          "Submit"
        )}
      </button>
    </form>
  );
};

export default AddPostForm;
