import React, { useState, useRef, useEffect } from "react";
import { IoReorderThreeSharp } from "react-icons/io5";
import { useLogoutUserMutation } from "../../feature/auth/authApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
const Header = ({ toggleSidebar, setToggleSidebar }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [userData] = useState({
    name: "AR Sabbir",
    role: "User",
    profileImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5CsU8USPdbDcqWEDnE3_NWG4rEbg3NLcQQ&usqp=CAU",
  });
  // get data from state
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
  const optionsRef = useRef(null);

  const handleImageClick = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <header className="header z-0 bg-white shadow py-4 px-4">
        <div className="flex items-center">
          {/* Toggle Button (Shown on mobile) */}
          {isMobile && (
            <button
              className="mr-4 text-gray-500 focus:outline-none"
              onClick={() => setToggleSidebar(false)}
            >
              <IoReorderThreeSharp className="h-6 w-6" />{" "}
            </button>
          )}

          {/* Search Input */}

          <div className=" flex justify-between w-full">
            <div className="relative">
              {isMobile ? (
                <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-gray-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              ) : (
                <input
                  type="text"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 h-10 focus:outline-none focus:border-indigo-400"
                  placeholder="Search..."
                />
              )}
            </div>

            {/* User Image */}
            <div className=" flex gap-2 justify-end">
              <div className="relative ml-auto" ref={optionsRef}>
                <a
                  href="#"
                  className="flex flex-row items-center"
                  onClick={handleImageClick}
                >
                  <img
                    src={userData?.profileImageUrl}
                    alt=""
                    className="h-10 w-10 bg-gray-200 border rounded-full"
                  />
                  <span className="flex flex-col ml-2">
                    <span className="truncate w-20 font-semibold tracking-wide leading-none">
                      {userData.name}
                    </span>
                    <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                      {userData.role}
                    </span>
                  </span>
                </a>
                {isOptionsVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg overflow-hidden transition-all duration-500">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white transition duration-300"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
