import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditPostForm from "../components/EditPostForm";

const EditPostPage = ({ showAddButton }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div
        className="flex  flex-col w-full border bg-gray-50  h-[
    100vh]"
      >
        <Navbar />
        <div className="p-4 space-y-6">
          {showAddButton && (
            <div className="flex justify-end">
              <button className="p-3 font-bold text-gray-500 bg-gray-200 rounded-lg shadow-lg hover:cursor-pointer">
                {" "}
                + Add New Post
              </button>
            </div>
          )}
          <EditPostForm />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
