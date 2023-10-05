import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import { NavElement } from "./Sidebar";
import { BsFire, BsFillPersonFill } from "react-icons/bs";
import { FaDeezer } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import TunyceLogo from '/tunyce_logo.svg';
import '../App.css';
import TunycDarkLogo from '../assets/tunyce_logo.svg'
// import { NavElProps } from "./Sidebar";
type NavElProps = {
    name: string;
    children: React.ReactNode;
    path?: string;
};

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
    button_label:string
}
const Actions = ({text, button_label,info}:ActionProps)=>(
    <div className="bg-slate-200 my-2 w-4/5 px-3 rounded-md py-2">
        <h3 className="font-bold text-sm">{text}</h3>    
        <p className="text-xs">{info}</p>
        <button className='w-3/5 rounded-md py-1 text-sm hover:bg-red-600 my-3 font-bold text-white bg-text-primary'>{button_label}</button>
    </div>
)
function DefaultLayout() {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const openSideBar = ()=>{setSideBarOpen(!sideBarOpen)}
    console.log(openSideBar)
    return (
        <div className="w-screen h-screen">
            <div className="h-full w-full">
                <header className="w-full bg-bg-primary md:hidden flex items-center px-2 justify-between">
                    <img src={TunycDarkLogo} alt="tunyce-logo" className="w-20 h-20  object-fill" />

                    <div className="flex flex-row items-center">
                        <a href="/register" className="border py-1 cursor-pointer text-sm my-2 mx-2 rounded-2xl px-4 border-black ">Sign Up</a>
                        <a href="/login" className="px-4 py-1 my-2 bg-text-primary rounded-2xl text-white font-semibold">Sign In</a>
                    </div>
                </header>
                <div className="flex">
                    <div className={`w-0 ${!sideBarOpen?'w-16':'md:w-1/5'} pt-4 `}>
                        <div className='flex flex-col w-full justify-center items-center ' >
                            <img alt='tunyce logo' className='w-32 h-auto' src={TunyceLogo} />
                            <div className='w-full'>
                                <h2 className='text-lg font-medium ml-3 mt-1'>MENU</h2>
                                <ul className='w-full'>
                                    <NavElement path='/'  name='Discover'>
                                        <GoHomeFill className='text-xl' />
                                    </NavElement>
                                    
                                    <NavElement path='/search'  name='Search'>
                                        <FiSearch className='text-xl' />
                                    </NavElement>
                                </ul>
                                <h2 className='text-lg font-medium ml-3 mt-1'>LIBRARY</h2>
                                <ul>
                                    <NavElement path="/trending" name='Trending'>
                                        <BsFire className='text-xl' />
                                    </NavElement>
                                    <NavElement path="/new" name='New'>
                                        <FaDeezer className='text-xl' />
                                    </NavElement>
                                    <NavElement name='Artists' path='/artists'>
                                        <BsFillPersonFill className='text-xl' />
                                    </NavElement>
                                </ul>
                                <div className="flex flex-col items-center">
                                    <Actions button_label="Create Playlist" text="Create you First playlist" info="it's easy, we'll help you"/>
                                    <Actions button_label="Stream podcasts" text="Enjoy greate podcasts" info="it's easy, we'll help you"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <a href="/login" className='w-3/5 py-1 px-1 text-center hover:bg-red-600 my-3 font-bold rounded-md text-white bg-text-primary'>SIGN IN</a>
                                    <p className="text-sm text-slate-600 leading-3 w-4/5">Sign in to create & share playlists, get personalized recommendations and more.</p>
                                </div>
                                {/* <a href="/login" className='w-4/5   py-1 px-1 hover:bg-red-600 my-3 font-bold text-white bg-text-primary'>SIGN IN</a> */}
                            </div>
                        </div>
                    </div>
                    <div className={`bg-bg-primary px-4 h-full w-full ${sideBarOpen?'md:w-4/5':'md:w-5/5'}`}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
