import React from "react";
import TunyceLogo from "../assets/tunyce_logo.svg";
import { GoHomeFill } from "react-icons/go";
// import { FaCompass } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";
// import { BsMusicNoteBeamed } from "react-icons/bs";
// import { BsFillPersonFill } from "react-icons/bs";
import { TbHeadphonesFilled } from "react-icons/tb";
// import { MdFavorite } from "react-icons/md";
import {  FaCompass, FaDeezer } from "react-icons/fa";
// import { ImFolderDownload } from "react-icons/im";
// import { IoSettingsSharp } from "react-icons/io5";
// import { TbLogout } from "react-icons/tb";
// import { BsPeopleFill } from "react-icons/bs";
import {NavLink } from "react-router-dom";
import { BsCart2, BsPeopleFill } from "react-icons/bs";
import {  AiFillWallet, AiOutlineClose } from "react-icons/ai";
// import { BsPeopleFill } from "react-icons/bs";

type NavElProps = {
  name: string;
  children: React.ReactNode;
  path?: string;
  onClick?: () => void;
};
function NavElement({ name,onClick, path, children }: NavElProps) {
  return (
    <NavLink
        onClick={onClick}
        to={path ?? "/musif"}
        style={({ isActive }) => {
            return {
                backgroundColor: isActive ? "#F0F0F5" : "white",
                borderRightColor: isActive ? "#FB5857" : "white",
                borderRightWidth: isActive ? 4 : 0,
                color:'#4D4D56'
            };
        }}
        className="flex  py-2 px-3  flex-row items-center w-full mt-2"
        >
            {children}
            <div className="w-6" />
            <p className="text-lg">{name}</p>
    </NavLink>
  );
}
type Props={
    toggleSideBar: ()=>void,
    sideBarOpen: boolean
}
function Sidebar({toggleSideBar,sideBarOpen}:Props) {
  return (
    <div className="w-full">
        <AiOutlineClose onClick={toggleSideBar}  className="text-xl md:hidden border-black border p-1 hover:bg-text-primary float-right mx-1 cursor-pointer" />
        <div className="flex flex-col w-full justify-center items-center ">
            <img alt="tunyce logo" className="w-32 h-auto" src={TunyceLogo} />
            <div className="w-full">
                <h2 className="text-lg font-medium ml-3 mt-3">MENU</h2>
                <ul className="w-full">
                    <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path="/" name="Explore">
                        <GoHomeFill className="text-xl" />
                    </NavElement>
                    <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path="/creators" name="Creators">
                        <BsPeopleFill className="text-xl" />
                    </NavElement>
                    <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path="/discover" name="Discover">
                        <FaCompass className="text-xl" />
                    </NavElement>
                </ul>
                <h2 className="text-lg font-medium ml-3 mt-3">LIBRARY</h2>
                <ul>
                    {/* <NavElement path="music" name="Music">
                        <BsMusicNoteBeamed className="text-xl" />
                    </NavElement> */}
                    <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path="mixes" name="Mixes">
                        <FaDeezer className="text-xl" />
                    </NavElement>
                    {/* <NavElement name="Artists">
                        <BsFillPersonFill className="text-xl" />
                    </NavElement> */}
                </ul>
                <h2 className="text-lg font-medium ml-3 mt-3">PLAYLISTS</h2>
                <ul>
                    <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path="/my-playlists" name="My Playlists">
                        <TbHeadphonesFilled className="text-xl" />
                    </NavElement>
                    {/* <NavElement name="Favorites">
                        <MdFavorite className="text-xl" />
                    </NavElement>
                    <NavElement name="Shared">
                        <FaShareAlt className="text-xl" />
                    </NavElement>
                    <NavElement name="Downloads">
                        <ImFolderDownload className="text-xl" />
                    </NavElement> */}
                </ul>
                <div className="md:hidden">
                    <h2 className="text-lg font-medium ml-3 mt-3">OTHER</h2>
                    <ul>
                        <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path="/cart" name="Cart">
                            <BsCart2 className="text-xl" />
                        </NavElement>
                    </ul>
                </div>
                <h2 className="text-lg font-medium ml-3 mt-3">OTHER</h2>
                <ul>

                <NavElement path="/user-wallet" name="Wallet">
                        <AiFillWallet className="text-xl" />
                    </NavElement>
                    {/* <NavElement name="Settings">
                        <IoSettingsSharp className="text-xl" />
                    </NavElement>
                    <NavElement name="Logout">
                        <TbLogout className="text-xl" />
                    </NavElement> */}

                      </ul>
               
            </div>
        </div>
    </div>
  );
}

export default Sidebar;
