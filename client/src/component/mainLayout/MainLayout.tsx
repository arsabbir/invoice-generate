import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.tsx";
import Header from "../header/Header.tsx";
import Footer from "../footer/Footer.tsx";
import { useState, useRef, useEffect } from "react";

const MainLayout = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);

  return (
    <div>
      <div className="flex flex-row min-h-screen overflow-auto bg-gray-100 text-gray-800">
        <Sidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <Header
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
          />
          <div className="bg-[#f5f5f5] px-4">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
