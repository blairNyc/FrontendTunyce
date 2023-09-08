import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
    return (
        <div className="container w-full h-screen">
            <div className="w-full grid grid-cols-4">
                <div className="col-span-1">
                    <Sidebar/>
                </div>
                <div className="bg-bg-primary col-span-3 col-start-2 col-end-5">
                    <Header/>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Layout;