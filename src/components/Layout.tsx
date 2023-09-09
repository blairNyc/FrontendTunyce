import TunyceLogo from "../assets/tunyce_logo.svg";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

function Layout() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <div className="w-screen h-screen">
      <nav className="fixed top-0 z-50 w-full bg-white ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setSideBarOpen(!sideBarOpen)}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-xl text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700 "
              >
                <AiOutlineMenu />
              </button>

              {!sideBarOpen && (
                <a href="#" className="flex ml-5 md:mr-24">
                  <img
                    alt="tunyce logo"
                    className="w-auto h-14"
                    src={TunyceLogo}
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-row w-full">
        <aside
          className={`${
            sideBarOpen
              ? "fixed top-0 left-0 z-40 w-72 h-screen bg-white transition-transform sm:w-72 sm:translate-x-0 sm:pt-20"
              : "fixed w-16 top-0 left-0 z-40 h-screen bg-white sm:translate-x-0 sm:w-16 sm:pt-20"
          } ${
            sideBarOpen ? "translate-x-15 w-screen" : "-translate-x-full"
          }  dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div
            className={`h-screen pb-4 w-full overflow-y-auto bg-white ${
              !sideBarOpen && "hidden md:block"
            }`}
          >
            <Sidebar sideBarOpen={sideBarOpen} />
          </div>
        </aside>

        <div
          className={`content-area w-full ${
            sideBarOpen ? "ml-72" : "sm:ml-0 md:ml-16"
          }`}
        >
          <div className="mt-14">
            <div className="grid col-span-4 col-start-1 col-end-5 mb-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
