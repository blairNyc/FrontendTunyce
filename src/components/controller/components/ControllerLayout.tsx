import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import TunyceLogo from '/tunyce_logo.svg';
import TunycLogo from '../../../assets/tunyce_logo.png';
import TunycDarkLogo from '../../../assets/tunyce_logo.svg'
import { BsChevronDown, BsPeopleFill,  } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import NavElement from "../../navelement";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch } from "../../../app/hooks";
import { logOut } from "../../auth/auth/authSlice";
type DropdownMenuProps ={
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
    onLogout: () => void
}

const DropdownMenu = ({ setIsDropdownOpen }: DropdownMenuProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLogout = async () => {
        dispatch(logOut());
        navigate('/');
    };

    return (
        <div id="dropdownAvatarName" className="z-50 absolute right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium">Controller</div>
                <div className="truncate">mail@mail.com</div>
            </div>
            <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => {
                        onLogout()
                        setIsDropdownOpen(false)
                    }}
                >Sign out</a>
            </div>
        </div>
    );
};

export default function ControllerLayout() {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-screen overflow-x-hidden h-screen">
      <div className="flex w-full h-full">
        <div className={`w-0 ${!sideBarOpen?'w-16':'md:w-1/5'} pt-4 `}>
            <div className='flex flex-col w-full justify-center items-center ' >
                    <img alt='tunyce logo' className='w-32 h-auto' src={TunyceLogo} />
                    <div className='w-full'>
                        <h2 className='text-lg font-medium ml-3 mt-1'>MENU</h2>
                        <ul className='w-full'>
                            <NavElement path="/music" name="Music">
                                <BsPeopleFill className="text-xl" />
                            </NavElement>
                            <NavElement path="/controller-creators" name="Discover">
                                <GoHomeFill className="text-xl" />
                            </NavElement>
                            
                        </ul>
                    
                    </div>
            </div>
        </div>
        <div
          className={`bg-bg-primary px-4 py-8 h-full w-full ${
            sideBarOpen ? "md:w-4/5" : "md:w-5/5"
          }`}
        >
          <div>
            <header className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <AiOutlineMenu onClick={setSideBarOpen} className="text-2xl text-black" />
                    <img src={TunycLogo} alt="" className={`w-24  h-auto ${sideBarOpen ? 'hidden' : 'block'} mx-2l object-contain`} />
                </div>
                <div className="hidden md:flex items-center justify-between rounded-2xl px-2 py-1 w-1/2">                    
                    <form className="w-full">   
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Artists, Mixes..." required></input>
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
                <img src={TunycDarkLogo} alt="" className={`w-20  h-auto md:hidden  object-contain`} />
                <div className="hidden md:flex items-center h-full cursor-pointer justify-between">
                    <div className="flex items-center mr-8">
                        {/* <PiShoppingCartSimpleBold className="text-2xl text-text-primary mx-2" /> */}
                        <div className="relative mx-2">
                            {/* <FaRegBell className="text-2xl text-text-primary" /> */}
                            {/* <div className="absolute -top-0 -right-0 w-1 h-1 rounded-full bg-red-500"></div> */}
                        </div>
                    </div>
                    <div className="flex h-full mx-2 items-center" onClick={toggleDropdown}>
                        <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full object-cover" />
                        <h3 className="text-md mx-2 font-bold">Controller</h3>
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
                <div className="hidden absolute top-14 left-16 items-center justify-between rounded-2xl px-4 py-1 h-8 w-2/3 bg-gray-200">
                    <input type="text" placeholder="Search" className="border-2 w-4/5 bg-inherit rounded-lg px-2 h-full outline-none" />
                    <FiSearch className="text-xl text-black w-1/5" />
                </div>

            </header>
            {isDropdownOpen && <DropdownMenu onLogout={()=>{}} setIsDropdownOpen={setIsDropdownOpen} />}
        </div>
          <div >
               <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
