import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetPostErrorLoading, setPostLoading } from "../reducers/postReducer";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import InputField from "../common/InputField";
import {baseUrl} from '../constants/constant'
const EditPostForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const { loading } = useSelector((state) => state.posts);
  const fetchSinglePost = async () => {
    try {
      dispatch(resetPostErrorLoading());
      dispatch(setPostLoading(true));
      const { data: response } = await axios.get(
        `${baseUrl}/api/v1/get-post/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.success) {
        setPostData({
          title: response.data.title,
          content: response.data.content,
          imageUrl: response.data.imageUrl,
        });
        dispatch(setPostLoading(false));
        toast.success("Post fetched successfully", { icon: "✅" });
      } else {
        toast.error(response?.message || "Error fetching post details", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Error fetching post details", {
        icon: "❌",
      });
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      dispatch(resetPostErrorLoading());
      dispatch(setPostLoading(true));
      const { data: response } = await axios.put(
        `${baseUrl}/api/v1/update-post/${id}`,
        postData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.success) {
        toast.success("Post updated successfully", { icon: "✅" });
        navigate("/");
      } else {
        toast.error(response?.message || "Error updating post", { icon: "❌" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Error updating post", { icon: "❌" });
    }
  };
  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  return (
    <form
      onSubmit={updatePost}
      className="max-w-md p-6 mx-auto mt-8 shadow-lg rounded-xl"
    >
      <h2
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-4 text-2xl font-bold hover:cursor-pointer"
      >
        <FaArrowLeft />
        Edit Post
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
        rows={6}
        required={true}
      />

      <InputField
        label="Image URL"
        id="image"
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
        className="text-white flex items-center justify-center bg-gray-500 hover:bg-gray-400 font-medium rounded-lg text-sm w-full px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
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

export default EditPostForm;
