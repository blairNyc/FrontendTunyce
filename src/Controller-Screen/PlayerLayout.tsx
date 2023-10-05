import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import TunycLogo from '../assets/tunyce_logo.png';
import VideoScreen from './VideoPlay';
import '../App.css';


const yout = () => {
  // const isMatOwner = useAppSelector((state: RootState) => state.persistAuth.auth.is_matatu);

  return (
    <div>
      <div className='w-full fixed top-0'>
        <Navbar fluid rounded className='bg-black'>
          <Navbar.Brand>
            <img
              alt="Flowbite React Logo"
              className="mr-3 h-6 sm:h-9"
              src={TunycLogo}
            />
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">greene@gmail.com</span>
              </Dropdown.Header>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        </Navbar>
      </div>

      <div className='mt-36 w-2800 flex align-center justify-center video-container'>

        <VideoScreen />

      </div>


    </div>
  );
};

export default yout;
