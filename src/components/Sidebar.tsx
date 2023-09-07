import React from 'react';
import TunycLogo from '../../public/tunyce_logo.svg'
import {GoHomeFill} from 'react-icons/go';
import { FaCompass } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { RiBookMarkFill } from 'react-icons/ri'
import { BsFillPersonFill } from 'react-icons/bs'
import { TbHeadphonesFilled } from 'react-icons/tb'
import { MdFavorite } from 'react-icons/md'
import { FaShareAlt } from 'react-icons/fa'
import { ImFolderDownload } from 'react-icons/im'
import { IoSettingsSharp } from 'react-icons/io5'
import { TbLogout } from 'react-icons/tb'


type NavElProps = {
    name: string
    children: React.ReactNode
}
function NavElement({name, children}:NavElProps){
    return(
        <div className='flex flex-row items-center w-full' >
            {children}
            <div className='w-3' />
            <p >{name}</p>
        </div>
    )
}
function Sidebar() {
    return (
        <div className='flex flex-col justify-center items-center m-10'>
            <img alt='tunyce logo' className='w-32 h-auto'src={TunycLogo}/>
            <div>
                <h2>MENU</h2>
                <ul>
                    <NavElement name='Discover'>
                        <GoHomeFill/>
                    </NavElement>
                    <NavElement name='Explorer'>
                        <FaCompass/>
                    </NavElement>
                    <NavElement name='Search'>
                        <FiSearch />
                    </NavElement>
                </ul>
                <h2>LIBRARY</h2>
                <ul>
                    <NavElement name='My Music'>
                        <BsMusicNoteBeamed />
                    </NavElement>
                    <NavElement name='Mixes'>
                        <RiBookMarkFill />
                    </NavElement>
                    <NavElement name='Artists'>
                        <BsFillPersonFill />
                    </NavElement>
                </ul>
                <h2>PLAYLISTS</h2>
                <ul>
                    <NavElement name='Cover'>
                        <TbHeadphonesFilled />
                    </NavElement>
                    <NavElement name='Favorites'>
                        <MdFavorite />
                    </NavElement>
                    <NavElement name='Shared'>
                        <FaShareAlt />
                    </NavElement>
                    <NavElement name='Downloads'>
                        <ImFolderDownload />
                    </NavElement>
                </ul>
                <h2>OTHER</h2>
                <ul>
                    <NavElement name='Settings'>
                        <IoSettingsSharp />
                    </NavElement>
                    <NavElement name='Logout'>
                        <TbLogout />
                    </NavElement>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;