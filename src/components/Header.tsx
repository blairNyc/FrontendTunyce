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
        </header>
    )
}

export default Header