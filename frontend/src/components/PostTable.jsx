import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPostErrorLoading,
  setPostLoading,
  setPosts,
  deletePost,
  setSearchTerm,
  setPage,
} from "../reducers/postReducer";
import toast from "react-hot-toast";
import Pagination from "./Pagination";
import { baseUrl } from "../constants/constant";

const PostTable = () => {
  const dispatch = useDispatch();

  const [totalPages, setTotalPages] = useState(0);
  const { error, loading, posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const { search: searchTerm, page } = useSelector((state) => state.posts);

  const fetchPosts = async () => {
    try {
      dispatch(resetPostErrorLoading());
      dispatch(setPostLoading(true));
      const res = await axios.get(
        `${baseUrl}/api/v1/get-all-posts?page_no=${page}&search=${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      const { data: response } = res;

      if (response.success) {
        dispatch(setPosts(response.data));
        setTotalPages(response.totalPages || 0);
      } else {
        toast.error(response?.message || "Error fetching posts", {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.respose?.data?.message || "Error fetching posts", {
        icon: "❌",
      });
    }
  };

  const handleDeletePost = async (id) => {
    if (!user) {
      toast.error("Please login to delete post", { icon: "❌" });
      return;
    }

    try {
      const res = await axios.delete(`${baseUrl}/api/v1/delete-post/${id}`, {
        withCredentials: true,
      });
      const { data: response } = res;
      console.log(response);
      if (response.success) {
        dispatch(deletePost(id));
        toast.success("Post deleted successfully", { icon: "✅" });
      } else {
        toast.error(response?.message, { icon: "❌" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Error deleting post", { icon: "❌" });
    }
  };
  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };
  useEffect(() => {
    fetchPosts();
  }, [page, searchTerm]);
  return (
    <div>
      <Table
        posts={posts}
        loading={loading}
        error={error}
        deletePost={handleDeletePost}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={handlePageChange}
      />
    </div>
  );
};

export default PostTable;
