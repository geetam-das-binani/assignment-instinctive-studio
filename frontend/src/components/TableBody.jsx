import React from "react";
import { monthsArray } from "../constants/constant";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const TableBody = ({
  id,
  content,
  createdAt,
  updatedAt,
  title,
  imageUrl,
  deletePost,
  isLast,
}) => {
  const truncate = (str) => (str.length > 15 ? str.slice(0, 15) + "..." : str);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const slicedYear = year.toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const nameOfMonth = monthsArray[month - 1];
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}. ${nameOfMonth}. ${slicedYear}`;
  };
  return (
    <tr  className={`font-medium
    hover:bg-gray-100 hover:cursor-pointer
    ${!isLast && `border-b`}`}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {id}
      </th>
      <td className="px-6 py-4">{title || "N/A"}</td>
      <td className="px-6 py-4 hidden md:table-cell">{truncate(content || "N/A")}</td>
      <td className="px-6 py-4">{formatDate(createdAt) || "N/A"}</td>{" "}
      <td className="px-6 py-4 hidden md:table-cell">{formatDate(updatedAt) || "N/A"}</td>
      <td className="px-6 py-4 hidden md:table-cell">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={imageUrl || ""}
          alt={title}
        />
      </td>
      <td className="flex items-center gap-2 px-6 py-4 hover:cursor-pointer">
        <Link to={`/edit/${id}`} className="font-medium hover:underline">
          <MdEdit className="text-xl" />
        </Link>
        <MdDelete onClick={() => deletePost(id)} className="text-xl" />
      </td>
    </tr>
  );
};

export default TableBody;
