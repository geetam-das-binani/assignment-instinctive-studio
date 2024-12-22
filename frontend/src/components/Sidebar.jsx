import React from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { MdMenuBook } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { RiSettingsLine } from "react-icons/ri";
import { ImLeaf } from "react-icons/im";
const Sidebar = () => {
  return (
    <div className=" md:block hidden border">
      <aside className="w-64 h-screen">
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <h1 className="font-bold text-2xl mb-2 space-x-3 flex items-center"> <ImLeaf />  Quyl.</h1>
          <ul className="space-y-2 font-medium mt-8">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <RiDashboard3Line />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <MdMenuBook />
                <span className="flex-1 ms-3 whitespace-nowrap">Students</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <FaBook className="text-gray-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">Chapter</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <IoIosHelpCircleOutline />
                <span className="flex-1 ms-3 whitespace-nowrap">Help</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <TbReportSearch />
                <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <RiSettingsLine />
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
