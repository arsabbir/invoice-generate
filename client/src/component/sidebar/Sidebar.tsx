import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useLogoutUserMutation } from "../../feature/auth/authApiSlice.ts";
import { useGetSettingQuery } from "../../feature/setting/settingApiSlice.ts";
import { RxCross2 } from "react-icons/rx";
const Sidebar = ({ toggleSidebar, setToggleSidebar }) => {
  const { data, isError, isLoading } = useGetSettingQuery("okk");
  const dataS = data && data[0]._id;

  // get data from state
  const { data: settingData } = useGetSettingQuery("");
  const firstSetting = settingData && settingData[0];
  const [isInvoiceDropdownVisible, setInvoiceDropdownVisible] = useState(false);

  const location = useLocation();
  // const [toggleSidebar, setToggleSidebar] = useState(true);
  const navigate = useNavigate();
  const toggleInvoiceDropdown = () => {
    setInvoiceDropdownVisible(!isInvoiceDropdownVisible);
  };
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      // Call the logout mutation and unwrap the result

      await logoutUser("logout");
      navigate("/login");
    } catch (error) {
      // Handle logout error
      console.error("Logout failed:", error);
    }
  };
  return (
    <aside
      className={`sidebar w-64 md:shadow transform z-50 md:translate-x-0 transition-transform duration-150 ease-in bg-[#339CCB] ${
        toggleSidebar == true ? "-translate-x-full" : ""
      }`}
      // Close sidebar when clicked
    >
      <div className="sidebar-header flex items-center justify-center py-4">
        <div className="inline-flex">
          <Link to={"/"} className="inline-flex flex-row items-center mr-1">
            <img
              className="w-10 h-10 "
              src={
                firstSetting?.logo ||
                "https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_favicon_icon_130608.png"
              }
              alt=""
            />
            <span className="leading-10  text-gray-100 text-2xl font-bold ml-1 uppercase">
              {firstSetting?.brandName || "INVOICE"}
            </span>
          </Link>
          {toggleSidebar == false && (
            <>
              <span
                onClick={() => setToggleSidebar(true)}
                className="inline-flex flex-row items-center"
              >
                <RxCross2 className="w-7 h-7 text-white" />
              </span>
            </>
          )}
        </div>
      </div>
      <div className="sidebar-content px-4 py-6">
        <ul className="flex flex-col w-full">
          <li>
            <Link
              to="/"
              className={`flex flex-row items-center h-10 px-3 rounded-lg  text-gray-300  hover:text-gray-700 ${
                location.pathname === "/" ? "bg-gray-100 text-gray-700" : ""
              }`}
            >
              <span
                className={`flex items-center justify-center text-lg text-[#53BD70]`}
              >
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </span>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>

          {/* invoice start */}
          <li>
            <span
              className={`flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700 cursor-pointer ${
                location.pathname === "/invoice-details" ||
                location.pathname === "/invoice" ||
                location.pathname === "/invoice-add"
                  ? "bg-gray-100 text-gray-700"
                  : ""
              }`}
              onClick={toggleInvoiceDropdown}
            >
              <span className="flex items-center justify-center text-lg text-[#53BD70]">
                <FaFileInvoice className="h-5 w-6" />
              </span>
              <span className="ml-3">Invoice</span>
            </span>
            {isInvoiceDropdownVisible && (
              <ul className="ml-4">
                <li>
                  <Link
                    to="/invoice-details"
                    className={`flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700 ${
                      location.pathname === "/invoice-details"
                        ? "text-gray-700 "
                        : ""
                    }`}
                  >
                    <span>
                      {" "}
                      <FaCircle className="h-3 w-3  " />
                    </span>
                    <span className="ml-3">Invoice Details</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invoice-add"
                    className={`flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700 ${
                      location.pathname === "/invoice-add"
                        ? "text-gray-700 "
                        : ""
                    }`}
                  >
                    <span>
                      {" "}
                      <FaCircle className="h-3 w-3  " />
                    </span>
                    <span className="ml-3">Add Invoice</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invoice"
                    className={`flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700 ${
                      location.pathname === "/invoice" ? "text-gray-700 " : ""
                    }`}
                  >
                    <span>
                      {" "}
                      <FaCircle className="h-3 w-3  " />
                    </span>
                    <span className="ml-3">Invoice List</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* invoice end */}
          <li className="my-px">
            <Link
              to={"/client"}
              className={`flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700 ${
                location.pathname === "/client"
                  ? "  text-gray-700 bg-gray-100"
                  : ""
              }`}
            >
              <span className="flex items-center justify-center text-lg text-[#53BD70]">
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <span className="ml-3">Clients</span>
              {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                1k
              </span> */}
            </Link>
          </li>

          <li className="my-px">
            <Link
              to={dataS ? `setting/${dataS}` : "/setting"}
              className={`flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700 ${
                location.pathname === "/setting"
                  ? "  text-gray-700 bg-gray-100"
                  : ""
              }`}
            >
              <span className="flex items-center justify-center text-lg text-[#53BD70]">
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span className="ml-3">Settings</span>
            </Link>
          </li>
          <li className="my-px">
            <a
              onClick={handleLogout}
              className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300  hover:text-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-[#53BD70]">
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="ml-3">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
