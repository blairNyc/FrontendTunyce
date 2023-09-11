import { BsChevronDown } from "react-icons/bs"
import { FaRegBell } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"

const ListItem = ({text}:{text:string})=>(<li className='mx-2'>{text}</li>)

function Header() {
    return (
        <header className="px-4 py-8 w-full">
            <ul className='list-none flex items-center'>
                <ListItem text='Music' />
                <ListItem text='Podcast'/>
                <ListItem text='Radio'/>
                <ListItem text='Live'/>
            </ul>
            <div className="hidden md:flex items-center justify-between rounded-2xl px-2 py-1 w-1/3  bg-gray-200">
                <input type="text" placeholder="Search" className="border-2 bg-inherit rounded-lg px-2 py-0 outline-none"/>
                <FiSearch className="text-2xl text-black mx-2"/>
            </div>
            <div className="hidden md:flex items-center h-full cursor-pointer justify-between">
                <div className="flex items-center mr-8">
                    <PiShoppingCartSimpleBold className="text-2xl text-text-primary mx-2"/>
                    <div className="relative mx-2">
                        <FaRegBell className="text-2xl text-text-primary"/>
                        <div className="absolute -top-0 -right-0 w-1 h-1 rounded-full bg-red-500"></div>
                    </div>
                </div>
                <div className="flex h-full mx-2 items-center">
                    <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full object-cover"/>
                    <h3 className="text-md mx-2 font-bold">John Doe</h3>
                    <BsChevronDown className="text-xl mx-2 text-black"/>
                </div>
            </div>
            <div className="flex items-center md:hidden">
                <FiSearch className="text-xl text-black "/>
                <img src="https://picsum.photos/200/300" alt="" className="w-7 ml-3 h-7 rounded-full object-cover"/>
            </div>
            <div className="hidden absolute top-14 left-16 items-center justify-between rounded-2xl px-4 py-1 h-8 w-2/3 bg-gray-200">
                <input type="text" placeholder="Search" className="border-2 w-4/5 bg-inherit rounded-lg px-2 h-full outline-none"/>
                <FiSearch className="text-xl text-black w-1/5"/>
            </div>
        </header>
    )
}

export default Header