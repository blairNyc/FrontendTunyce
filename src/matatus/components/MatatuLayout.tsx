import { useState } from "react";
import { BsChevronDown, BsWallet, } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import TunyceLogo from '/tunyce_logo.svg';
import TunycDarkLogo from '../../assets/tunyce_logo.svg'
import NavElement from "../../components/navelement";
import { Outlet, useNavigate } from "react-router-dom";
// import {IoSettingsSharp} from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { FaRegBell } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { switchUser } from "../../components/auth/auth/authSlice";
import { RootState } from "../../app/store";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
export const DropdownMenu = ({ setIsDropdownOpen, logOutHandler, userName, switchAccountHandler }: { userName: string, logOutHandler: () => void, setIsDropdownOpen: (val: boolean) => void, switchAccountHandler: () => void }) => (
    <div id="dropdownAvatarName" className="z-50 absolute top-1 right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <AiOutlineClose className="text-2xl cursor-pointer m-2 text-black mx-2" onClick={() => { setIsDropdownOpen(false) }} />
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium ">{userName}</div>
            {/* <div className="truncate">johndoe@gmail.com</div> */}
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
            <li>
                <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                        switchAccountHandler()
                    }}
                >Switch to NormalUser
                </button>
            </li>
        </ul>
        <div className="py-2">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={() => {
                    logOutHandler()
                    setIsDropdownOpen(false)
                }}
            >Sign out</a>
        </div>
    </div>
);
import { logOut } from "../../components/auth/auth/authSlice";
function MatatuLayout() {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const toggleSideBar = () => { setSideBarOpen(!sideBarOpen) }
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useAppDispatch();
    const userName = useAppSelector((state: RootState) => state.persistAuth.auth.username);
    const navigate = useNavigate();
    const switchAccountHandler = () => {
        dispatch(switchUser('is_normaluser'));
        setIsDropdownOpen(false);
        navigate('/');
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const onLogout = async () => {
        dispatch(logOut());
        navigate('/');
    };
    return (
        <div className="w-screen ">
            <div className="flex w-full">
                <div className={`w-0  ${!sideBarOpen ? "absolute w-3/5 h-full md:hidden bg-white" : "md:w-1/5 h-full"} pt-4 `}>
                    <AiOutlineClose onClick={toggleSideBar} className="text-xl md:hidden border-black border p-1 hover:bg-text-primary float-right mx-1 cursor-pointer" />
                    <div className='flex flex-col w-full justify-center items-center ' >
                        <img alt='tunyce logo' className='w-32 h-auto' src={TunyceLogo} />
                        <div className='w-full'>
                            <h2 className='text-lg font-medium ml-3 mt-1'>MENU</h2>
                            <ul className='w-full'>
                                <NavElement onClick={() => { !sideBarOpen ? toggleSideBar() : '' }} path='/matatu' name='Dashboard'>
                                    <GoHomeFill className='text-xl' />
                                </NavElement>
                            </ul>
                            <h2 className='text-lg font-medium ml-3 mt-1'>OTHERS</h2>
                            <ul>
                                <NavElement onClick={() => { !sideBarOpen ? toggleSideBar() : '' }} path='/my-wallet' name='Wallet'>
                                    <BsWallet className='text-xl' />
                                </NavElement>
                                {/* <NavElement path='/restaurant/my-settings' name='Settings'>
                                    <IoSettingsSharp className='text-xl' />
                                </NavElement> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`bg-bg-primary px-4 w-full ${sideBarOpen ? 'md:w-4/5' : 'md:w-5/5'}`}>
                    <header className="w-full mt-5 flex items-center justify-between">
                        <div className="flex cursor-pointer items-center">
                            <AiOutlineMenu onClick={toggleSideBar} className="text-2xl text-black" />
                            <img src={TunyceLogo} alt="" className={`w-24  h-auto ${sideBarOpen ? 'hidden' : 'block'} mx-2l object-contain`} />
                        </div>

                        <div className="hidden md:flex items-center justify-between rounded-2xl px-2 py-1 w-1/3  bg-gray-200">
                            <input type="text" placeholder="Search" className="border-none w-full h-full bg-inherit rounded-lg px-2 py-0 outline-none" />
                            <FiSearch className="text-2xl text-black mx-2" />
                        </div>
                        <img src={TunycDarkLogo} alt="" className={`w-20  h-auto md:hidden  object-contain`} />
                        <div className="hidden md:flex items-center h-full cursor-pointer justify-between">
                            <div className="flex items-center mr-8">
                                <div className="relative mx-2">
                                    <FaRegBell className="text-2xl text-text-primary" />
                                    <div className="absolute -top-0 -right-0 w-1 h-1 rounded-full bg-red-500"></div>
                                </div>
                            </div>
                            <div onClick={toggleDropdown} className="flex h-full mx-2 items-center">
                                <div className="w-10 h-10 text-white font-bold text-2xl p-1 text-center rounded-full bg-red-600">{userName[0]}</div>
                                <h3 className="text-md mx-2 font-bold">{userName}</h3>
                                <BsChevronDown className="text-xl mx-2 text-black" />
                            </div>
                        </div>
                        <div className="flex px-2 items-center md:hidden" >
                            {/* <FiSearch className="text-xl text-black " /> */}
                            <div onClick={toggleDropdown} className="flex hover:bg-slate-200 cursor-pointer p-1 rounded-xl items-center ml-1">
                                <img src="https://picsum.photos/200/300" alt="" className="w-7 ml-3 h-7 rounded-full object-cover" />
                                <BsChevronDown className="text-xl mx-1 text-black" />
                            </div>
                        </div>
                    </header>
                    <Outlet />
                </div>
            </div>
            {isDropdownOpen && <DropdownMenu logOutHandler={onLogout} userName={userName} setIsDropdownOpen={toggleDropdown} switchAccountHandler={switchAccountHandler} />}
        </div>
    );
}

export default MatatuLayout;