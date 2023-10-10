import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Header from "./Header";
import '../App.css';

function Layout() {
  
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  const toggleSideBar = () => {setSideBarOpen(!sideBarOpen)};
  return (
    <div className="w-screen overflow-hidden no-scrollbar h-screen">
        <div className="flex overflow-hidden w-full">
            <div className={`w-0 overflow-hidden ${!sideBarOpen ? "absolute z-50 w-3/5 h-full md:hidden bg-white" : "md:w-1/5 h-full"} pt-4 `}>
                <Sidebar sideBarOpen={sideBarOpen} toggleSideBar={toggleSideBar} />
            </div>
            <div className={`bg-bg-primary overflow-scroll px-4 py-8 h-screen w-full ${
                    sideBarOpen ? "md:w-4/5" : "md:w-5/5"
                }`}
                >
                <Header
                    sideBarOpen={sideBarOpen}
                    setSideBarOpen={toggleSideBar}
                />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Layout;
