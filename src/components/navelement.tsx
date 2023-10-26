import { NavLink } from "react-router-dom"

export type NavElProps = {
    name: string
    children: React.ReactNode
    path?: string
    onClick?: () => void
}
export default function NavElement({ name, path, onClick, children }: NavElProps) {
    return (
        <NavLink onClick={onClick} to={path ?? '/musif'} style={({ isActive }) => { return { backgroundColor: isActive ? '#F0F0F5' : 'white', borderRightColor:isActive?'#FB5857':'white',borderRightWidth:isActive?4:0}}}  className='flex  py-2 px-3  flex-row items-center w-full mt-2' >
            {children}
            <div className='w-6' />
            <p className='text-lg'>{name}</p>
        </NavLink>
    )
}