import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import { NavElement } from "./Sidebar";
import { BsFire, BsFillPersonFill } from "react-icons/bs";
import { FaCompass, FaDeezer } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import TunyceLogo from '/tunyce_logo.svg';
import { NavElProps } from "./Sidebar";
function NavElement({ name, path,  children }: NavElProps) {
    return (
        <NavLink to={path ?? '/musif'} style={({ isActive }) => { return { backgroundColor: isActive ? '#F0F0F5' : 'white', borderRightColor:isActive?'#FB5857':'white',borderRightWidth:isActive?4:0}}}  className='flex  py-2 px-3  flex-row items-center w-full mt-1' >
            {children}
            <div className='w-6' />
            <p className='text-lg'>{name}</p>
        </NavLink>
    )
}
interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string
    info: string
}
const Actions = ({text,info}:ActionProps)=>(
    <div className="bg-bg-primary my-2 w-4/5 px-3 rounded-md py-2">
        <h3 className="font-bold text-sm">{text}</h3>    
        <p>{info}</p>
        <button className='w-4/5 py-1 px-1 uppercase hover:bg-red-600 my-3 font-bold text-white bg-text-primary'>Create Playlist</button>
    </div>
)
function DefaultLayout() {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const openSideBar = ()=>{setSideBarOpen(!sideBarOpen)}
    console.log(openSideBar)
    return (
        <div className="w-screen h-screen">
            <div className="flex w-full">
                <div className={`w-0 ${!sideBarOpen?'w-16':'md:w-1/5'} pt-4 `}>
                <div className='flex flex-col w-full justify-center items-center ' >
                        <img alt='tunyce logo' className='w-32 h-auto' src={TunyceLogo} />
                        <div className='w-full'>
                            <h2 className='text-lg font-medium ml-3 mt-1'>MENU</h2>
                            <ul className='w-full'>
                                <NavElement path='/'  name='Discover'>
                                    <GoHomeFill className='text-xl' />
                                </NavElement>
                                <NavElement path='explore' name='Explorer'>
                                    <FaCompass className='text-xl' />
                                </NavElement>
                                <NavElement path='/search'  name='Search'>
                                    <FiSearch className='text-xl' />
                                </NavElement>
                            </ul>
                            <h2 className='text-lg font-medium ml-3 mt-1'>LIBRARY</h2>
                            <ul>
                                <NavElement name='Trending'>
                                    <BsFire className='text-xl' />
                                </NavElement>
                                <NavElement name='New'>
                                    <FaDeezer className='text-xl' />
                                </NavElement>
                                <NavElement name='Artists' path='/artist'>
                                    <BsFillPersonFill className='text-xl' />
                                </NavElement>
                            </ul>
                            <div className="flex flex-col items-center">
                                <Actions text="Create you First playlist" info="it's easy, we'll help you"/>
                                <Actions text="Enjoy greate podcasts" info="it's easy, we'll help you"/>
                            </div>
                            <button className='w-4/5 py-1 px-1 hover:bg-red-600 my-3 font-bold text-white bg-text-primary'>SIGN IN</button>
                        </div>
                    </div>
                </div>
                <div className={`bg-bg-primary px-4  h-full w-full ${sideBarOpen?'md:w-4/5':'md:w-5/5'}`}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;