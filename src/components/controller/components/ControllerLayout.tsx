import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../../Header";
import TunyceLogo from '/tunyce_logo.svg';
import { BsPeopleFill,  } from "react-icons/bs";
import { FiLogOut,  } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import NavElement from "../../navelement";
import { FaCompass } from "react-icons/fa";

export default function ControllerLayout() {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  return (
    <div className="w-screen h-screen">
      <div className="flex w-full h-full">
      <div className={`w-0 ${!sideBarOpen?'w-16':'md:w-1/5'} pt-4 `}>
            <div className='flex flex-col w-full justify-center items-center ' >
                    <img alt='tunyce logo' className='w-32 h-auto' src={TunyceLogo} />
                    <div className='w-full'>
                        <h2 className='text-lg font-medium ml-3 mt-1'>MENU</h2>
                        <ul className='w-full'>
                            <NavElement path="/controller-creators" name="Discover">
                                <GoHomeFill className="text-xl" />
                            </NavElement>
                            <NavElement path="/creators" name="Creators">
                                <BsPeopleFill className="text-xl" />
                            </NavElement>
                            <NavElement path="explore" name="Explorer">
                                <FaCompass className="text-xl" />
                            </NavElement>
                           
                        </ul>
                        <h2 className='text-lg font-medium ml-3 mt-1'>OTHERS</h2>
                        <ul>
                            
                            <NavElement  name='Logout' path='/logout'>
                                <FiLogOut className='text-xl' />
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
          <Header
            sideBarOpen={sideBarOpen}
            setSideBarOpen={() => {
              setSideBarOpen(!sideBarOpen);
            }}
          />
          <div >
               <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
