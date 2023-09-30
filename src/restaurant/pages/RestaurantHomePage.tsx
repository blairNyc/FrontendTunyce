import {IoAdd } from 'react-icons/io5';

import Backdrop from '../../components/Backdrop';
import UploadIcon from '/uploadicon.svg';
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

    const handleClick = (restaurantId: any) => {
        navigate(`/restaurant-details/${restaurantId}`)
    }

    

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => { setIsModalOpen(false) };


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

            <AddRestaurantModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default RestaurantHomePage;