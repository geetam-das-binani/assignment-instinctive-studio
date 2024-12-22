import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddPostForm from "../components/AddPostForm";

const AddPostPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div
        className="flex  flex-col w-full border bg-gray-50  h-[
    100vh]"
      >
        <Navbar />
        <div className="p-4 space-y-8">
          <AddPostForm />
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;
