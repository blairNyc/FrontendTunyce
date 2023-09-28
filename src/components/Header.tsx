import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import TunycLogo from '../assets/tunyce_logo.png';
import {AiOutlineMenu} from "react-icons/ai";
import { useAppDispatch, useAppSelector} from "../app/hooks";
import { useUpgradeToMatatuOwnerMutation, useUpgradeToRestaurantOwnerMutation, } from "../app/features/content/contentApiSlice";
import { useState } from "react";
import { RootState } from "../app/store";
import { setCredentials } from "./auth/auth/authSlice";
const ListItem = ({text,currPath, path}:{text:string,currPath: string, path: string})=>(
    <NavLink style={({isActive})=>{return{color:isActive?'#FB5857':'#4D4D56'}}} to={path} className='mx-[5px] md:mx-2'>
        <p className={``}>{text}</p>
        {path === currPath && (<p className="border-b-4 rounded-lg border-text-primary w-4 mx-auto text-center"></p>)}
    </NavLink>
);
interface IHeaderProp {
    sideBarOpen: boolean
    setSideBarOpen: () => void
}

function Header({ setSideBarOpen, sideBarOpen }: IHeaderProp) {

    const dispatch = useAppDispatch()
    const isMatOwner = useAppSelector((state:RootState)=>state.persistAuth.auth.is_matatu);
    const authVal = useAppSelector((state:RootState)=>state.persistAuth.auth);
    const location = useLocation().pathname;
    console.log(location);
    // const dispatch = useAppDispatch()
    // const handleSwithUser = (userType: keyof UserTypes)=>{
    //     dispatch(switchUser(userType))
    // }
    // return (
    //     <header className="w-full  flex items-center justify-between">
    //         <div className="flex items-center">
    //             <AiOutlineMenu onClick={setSideBarOpen} className="text-2xl text-black"/>
    //             <img src={TunycLogo} alt="" className={`w-10  h-auto ${sideBarOpen?'hidden':'block'} mx-2 rounded-full object-contain`}/>

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [displayUpgradeModal, setDisplayUpgradeModal] = useState(false);

    const [selectedValue, setSelectedValue] = useState("Content Creator");
    const handleSelectChange = (event : any) => {
        setSelectedValue(event.target.value);
    };

    const [upgradeMatatu] = useUpgradeToMatatuOwnerMutation()
    const [upgradeRestaurant] = useUpgradeToRestaurantOwnerMutation()

    const onSubmitUpgrade = async (selectedValue : any) => {
        
        try {
            if (selectedValue == "Matatu Owner") {
                dispatch(upgradeMatatu)
            } else if (selectedValue == "Restaurant Owner") {
                dispatch(upgradeRestaurant)
            }
        } catch (error) {
            console.log(error)
        }



    };
    const navigate = useNavigate();
    const switchAccountHandler = ()=>{
        try {
            
            dispatch(setCredentials({
                auth:{
                    curr_loggedin_user:'is_matatu',
                    access: authVal.access,
                    refresh: authVal.refresh,
                    username: authVal.username,
                    // is_normaluser: authVal.is_normaluser
                }
            }));
            navigate('/matatu');
        } catch (error) {
            
        }
    }
    const DropdownMenu = () => (
        <div id="dropdownAvatarName" className="z-50 absolute right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium ">{authVal.username}</div>
                <div className="truncate">mail@mail.com</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                <li>
                   {isMatOwner?( <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                            switchAccountHandler()
                            setIsDropdownOpen(false)
                        }}
                        >Switch to Matatu owner</a>):null
                    }
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                            setIsDropdownOpen(false)
                            setDisplayUpgradeModal(true)
                        }}
                    >Upgrade Account</a>
                </li>
            </ul>
            <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => {
                        setIsDropdownOpen(false)
                    }}
                >Advertise</a>
            </div>
            <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => {
                        setIsDropdownOpen(false)
                    }}
                >Sign out</a>
            </div>
        </div>
    );

    const UpgradeAccountModal = () => (
        <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center">
            <div className="relative w-full max-w-2xl max-h-full">
                
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Account Upgrade
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal"
                            onClick={() => {
                                setDisplayUpgradeModal(false)
                            }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            To upgrade your account please pick an account type from the dropdown below:
                        </p>
                        <select
                            id="accountType"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-universal-primary focus:border-universal-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-universal-primary dark:focus:border-blue-500"
                            value={selectedValue}
                            onChange={handleSelectChange}
                        >
                            <option value="Account Type">Account Type</option>
                            <option value="Content Creator">Content Creator</option>
                            <option value="Matatu Owner">Matatu Owner</option>
                            <option value="Restaurant Owner">Restaurant Owner</option>
                            <option value="Record Label">Record Label</option>
                            <option value="Film Maker">Film Maker</option>
                            <option value="Advertiser">Advertiser</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="staticModal" type="button" className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                                
                                onSubmitUpgrade(selectedValue)
                                setDisplayUpgradeModal(false)
                            }}
                        >Upgrade</button>
                        <button data-modal-hide="staticModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={() => {
                                setDisplayUpgradeModal(false)
                            }}
                        >Decline</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (

        <div>
            <header className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <AiOutlineMenu onClick={setSideBarOpen} className="text-2xl text-black" />
                    <img src={TunycLogo} alt="" className={`w-10  h-auto ${sideBarOpen ? 'hidden' : 'block'} mx-2 rounded-full object-contain`} />
                </div>
                <ul className='list-none hidden md:flex items-center'>
                    <ListItem text='Music' currPath={location} path="/music" />
                    <ListItem text='Podcast' currPath={location} path="/podcasts" />
                    <ListItem text='Live' currPath={location} path="/live" />
                </ul>
                <div className="hidden md:flex items-center justify-between rounded-2xl px-2 py-1 w-1/3  bg-gray-200">
                    <input type="text" placeholder="Search" className="border-2 bg-inherit rounded-lg px-2 py-0 outline-none" />
                    <FiSearch className="text-2xl text-black mx-2" />
                </div>
                <div className="hidden md:flex items-center h-full cursor-pointer justify-between">
                    <div className="flex items-center mr-8">
                        <PiShoppingCartSimpleBold className="text-2xl text-text-primary mx-2" />
                        <div className="relative mx-2">
                            <FaRegBell className="text-2xl text-text-primary" />
                            <div className="absolute -top-0 -right-0 w-1 h-1 rounded-full bg-red-500"></div>
                        </div>
                    </div>
                    <div className="flex h-full mx-2 items-center" onClick={toggleDropdown}>
                        <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full object-cover" />
                        <h3 className="text-md mx-2 font-bold">{authVal.username}</h3>
                        <BsChevronDown className="text-xl mx-2 text-black" />
                    </div>
                </div>
                <div className="flex items-center md:hidden">
                    <FiSearch className="text-xl text-black " />
                    <img src="https://picsum.photos/200/300" alt="" className="w-7 ml-3 h-7 rounded-full object-cover" />
                </div>
                <div className="hidden absolute top-14 left-16 items-center justify-between rounded-2xl px-4 py-1 h-8 w-2/3 bg-gray-200">
                    <input type="text" placeholder="Search" className="border-2 w-4/5 bg-inherit rounded-lg px-2 h-full outline-none" />
                    <FiSearch className="text-xl text-black w-1/5" />
                </div>
                
            </header>

            {isDropdownOpen && <DropdownMenu />}
            {displayUpgradeModal && <UpgradeAccountModal />}

        </div>


    )
}

export default Header