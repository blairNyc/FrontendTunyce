import {IoAdd } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import AddRestaurantModal from '../components/AddRestaurantPage';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import axios from 'axios';

interface RestaurantData {
    id: number;
    name: string;
    capacity: number;
    image_exterior: string;
    image_interior: string;
    created_at: string;
    is_trial: boolean;
    owner: number;
    control: number;
    location: number;
}

export const FeaturedItem = ({title, imageLink}:{title:string, imageLink : string})=>(
    <div className={`w-1/3 min-w-[280px] mx-3 relative flex flex-col cursor-pointer items-center justify-end pb-4 h-48`}>
        <img src={imageLink} alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-center"/>
       <div className="absolute  ">
            <h4 className="text-white text-center font-bold text-xl">{title}</h4>
        </div>
    </div>
);

function RestaurantHomePage() {

    const navigate = useNavigate();

    const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);

    const [data, setRestaurantData] = useState<any>()

    const [displaySuccessNotification, setDisplaySuccessNotification] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // setIsLoading(true)

                const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/restaurant/restaurants', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                const data = responseRoute.data;
                // console.log(data)

                setRestaurantData(data.message)

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
               //  setIsLoading(false);
            }
        };

        fetchData();

    }, [userToken]);

    const handleSuccessClosing = () => {
        setDisplaySuccessNotification(false);
    }

    const handleClick = (restaurantId: any) => {
        navigate(`/restaurant-details/${restaurantId}`)
    }

    

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => { setIsModalOpen(false) };

    const successRegistration = () => {
        setIsModalOpen(false);

        setDisplaySuccessNotification(true)
        const timer = setTimeout(() => {
            setDisplaySuccessNotification(false)
        }, 3000);

        return () => clearTimeout(timer);
    }



    return (
        <>
            {/* {openModal && <NewRestaurantModal toggleModal={toggleModal} />} */}
           
            <div className='w-full mt-8 h-full'>
                <div className='w-full flex items-center justify-between'>
                    <h2 className="text-2xl text-text-primary font-bold">My Restaurants</h2>
                    <button onClick={openModal} className="flex items-center justify-between font-bold text-text-primary">
                        <IoAdd className='text-xl border-2 rounded-md border-text-primary mx-2'/>
                        New Restaurant
                    </button>
                </div>
                <div className="w-full mt-5 flex items-center no-scrollbar overflow-x-auto">
                    {data?.map((restaurant: RestaurantData) => (
                        <div onClick={() => {
                            const restaurantId: any = restaurant.id
                            handleClick(restaurantId)
                        }} className="hover:cursor-pointer">
                            <FeaturedItem title={restaurant.name} imageLink="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" />
                        </div>
                    ))}
                </div>
            </div>

            <AddRestaurantModal isOpen={isModalOpen} onClose={closeModal} isRegistrationSuccessFull={successRegistration} />

            {
                displaySuccessNotification &&
                <div className="absolute right-10 top-10 z-50">
                    <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            <span className="sr-only">Check icon</span>
                        </div>
                        <div className="ml-3 text-sm font-normal">Matatu Created Successfully</div>
                        <button type="button" onClick={handleSuccessClosing} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </>
    );
}

export default RestaurantHomePage;