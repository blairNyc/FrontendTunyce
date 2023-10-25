import { useState } from "react";
import { BsChevronDown, BsWallet,} from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import TunyceLogo from '/tunyce_logo.svg';
import TunycDarkLogo from '../../assets/tunyce_logo.svg'
import NavElement from "../../components/navelement";
import { Outlet } from "react-router-dom";
import {IoSettingsSharp} from 'react-icons/io5';
import {FiSearch} from 'react-icons/fi';
import {FaRegBell} from 'react-icons/fa';
import { DropdownMenu } from "../../matatus/components/MatatuLayout";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import { logOut, switchUser } from "../../components/auth/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { AiOutlineMenu,AiOutlineClose } from "react-icons/ai";
function RestaurantLayout() {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const toggleSideBar = ()=>{setSideBarOpen(!sideBarOpen)}

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userName = useAppSelector((state:RootState)=>state.persistAuth.auth.username);
    const switchAccountHandler = () => {
        dispatch(switchUser('is_normaluser'));
        setIsDropdownOpen(false);
        navigate('/home');
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const onLogout = async () => {
        dispatch(logOut());
        navigate('/');
    };
    return (
        <div className="overflow-hidden no-scrollbar">
            <div className="flex">
                <div className={`w-0  ${!sideBarOpen ? "absolute w-3/5 z-20 h-full md:hidden bg-white" : "md:w-1/5 h-full"} pt-4 `}>
                    <AiOutlineClose onClick={toggleSideBar}  className="text-xl md:hidden border-black border p-1 hover:bg-text-primary float-right mx-1 cursor-pointer" />
                    <div className='flex flex-col  justify-center items-center ' >
                            <img alt='tunyce logo' className='w-32 h-auto' src={TunyceLogo} />
                            <div className='w-full'>
                                <h2 className='text-lg font-medium ml-3 mt-1'>MENU</h2>
                                <ul className='w-full'>
                                    <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path='/restaurant/'  name='Dashboard'>
                                        <GoHomeFill className='text-xl' />
                                    </NavElement>
                                </ul>
                                <h2 className='text-lg font-medium ml-3 mt-1'>OTHERS</h2>
                                <ul>
                                    <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path='/restaurant/my-wallet' name='Wallet'>
                                        <BsWallet className='text-xl' />
                                    </NavElement>
                                    <NavElement onClick={()=>{!sideBarOpen?toggleSideBar():''}} path='/restaurant/my-settings' name='Settings'>
                                        <IoSettingsSharp className='text-xl' />
                                    </NavElement>
                                </ul>
                            </div>
                    </div>
                </div>
                <div className={`bg-bg-primary px-4  ${sideBarOpen?'md:w-4/5':'md:w-5/5'}`}>
                    <header className="w-full mt-5 flex items-center justify-between">
                        <div className="flex cursor-pointer items-center">
                            <AiOutlineMenu onClick={toggleSideBar} className="text-2xl text-black" />
                            <img src={TunyceLogo} alt="" className={`w-24  h-auto ${sideBarOpen ? 'hidden' : 'block'} mx-2l object-contain`} />
                        </div>
                        <div className="hidden md:flex items-center justify-between rounded-2xl px-2 py-1 w-1/3  bg-gray-200">
                            <input type="text" placeholder="Search" className="border-none w-full h-full bg-inherit rounded-lg px-2 py-0 outline-none"/>
                            <FiSearch className="text-2xl text-black mx-2"/>
                        </div>
                        <img src={TunycDarkLogo} alt="" className={`w-20  h-auto md:hidden  object-contain`} />
                        <div className="hidden md:flex items-center h-full cursor-pointer justify-between">
                            <div className="flex items-center mr-8">
                                <div className="relative mx-2">
                                    <FaRegBell className="text-2xl text-text-primary"/>
                                    <div className="absolute -top-0 -right-0 w-1 h-1 rounded-full bg-red-500"></div>
                                </div>
                            </div>
                            <div onClick={toggleDropdown} className="flex h-full mx-2 items-center">
                                <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full object-cover"/>
                                <h3 className="text-md mx-2 font-bold">{userName}</h3>
                                <BsChevronDown className="text-xl mx-2 text-black"/>
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
                    <Outlet/>
                </div>
            </div>
            {isDropdownOpen && <DropdownMenu logOutHandler={onLogout} userName={userName}  setIsDropdownOpen={toggleDropdown} switchAccountHandler={switchAccountHandler} />}
        </div>
    );
}

export default RestaurantLayout;
