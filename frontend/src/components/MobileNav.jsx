import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdMenuBook } from "react-icons/md";
import { RiDashboard3Line, RiSettingsLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../reducers/userReducer";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../constants/constant";
const MobileNav = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const { data: response } = await axios.post(
        `${baseUrl}/api/v1/logout-user`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.success) {
        dispatch(setUser(null));
      } else {
        toast.error(response.message || "Something went wrong", {
          icon: "❌",
        });
      }
    } catch (error) {
      toast.error(response.message || "Something went wrong", {
        icon: "❌",
      });
    }
  };
  return (
    <div className="fixed left-0 z-50 w-full h-full text-gray-600 bg-gray-100 md:hidden top-16">
      <div className="p-6 ">
        <ul className="space-y-6 ">
          {loading && (
            <div>
              <div >
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                
              </div>
            </div>
          )}
          {!loading && (
            <li className="flex items-center gap-4 p-2 rounded-lg hover:cursor-pointer">
              {user ? (
                <>
                  <img
                    onClick={() => navigate("/profile")}
                    className="object-cover w-8 h-8 rounded-full cursor-pointer"
                    src={
                      user?.imageUrl ||
                      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
                    }
                    alt="profile image"
                  />
                  <span>{user?.email || ""} </span>
                  <button
                    onClick={handleLogout}
                    className="p-3 font-bold text-gray-500 bg-gray-200 rounded-lg shadow-lg"
                  >
                    {" "}
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to={"/login"}
                  className="p-3 font-bold text-gray-500 bg-gray-200 rounded-lg shadow-lg"
                >
                  Login
                </Link>
              )}
            </li>
          )}
          <li className="p-2 rounded-lg hover:bg-gray-200">
            <a
              href="
                        #"
              className="flex items-center gap-2"
            >
              <IoIosHelpCircleOutline className="text-2xl" />
              <span>Help</span>
            </a>
          </li>
          <li className="p-2 rounded-lg hover:bg-gray-200">
            <a
              href="
                        #"
              className="flex items-center gap-2"
            >
              <CiBellOn className="text-2xl" />
              <span>Notification</span>
            </a>
          </li>
          <li className="p-2 rounded-lg hover:bg-gray-200">
            <a
              href="
                        #"
              className="flex items-center gap-2"
            >
              <LuMessageSquareMore className="text-2xl" />
              <span>Message</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 "
            >
              <RiDashboard3Line />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
            >
              <MdMenuBook />
              <span className="flex-1 ms-3 whitespace-nowrap">Students</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 "
            >
              <FaBook className="text-gray-500" />
              <span className="flex-1 ms-3 whitespace-nowrap">Chapter</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 "
            >
              <IoIosHelpCircleOutline />
              <span className="flex-1 ms-3 whitespace-nowrap">Help</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 "
            >
              <TbReportSearch />
              <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 "
            >
              <RiSettingsLine />
              <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
