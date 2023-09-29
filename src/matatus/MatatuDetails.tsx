import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import axios from 'axios';

interface OwnerInterface {
    id: number;
    name: string;
    number_plate: string;
    number_of_seats: number;
    image_exterior: string;
    is_trial: boolean;
    image_interior: string;
    created_at: string;
    owner: number;
    driver: number;
    route: number;
}

const MatatuDetails = () => {

    const userToken : any = useAppSelector((state: RootState) => state.persistAuth.auth.access);

    // Matatu Information
    const [ownerInfo, setOwnerInformation] = useState<OwnerInterface>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/update_matatu/6/', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                const data = responseRoute.data;
                console.log(data.message);

                setOwnerInformation(data.message)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [userToken]);


    const handleControllerCreation = async () => {
        try {
            const controllerDetails = {
                password: "Hope2022*"
            }

            const controllerCreation = await axios.post(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_controller/6/`, controllerDetails, {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            });
            console.log('POST Response:', controllerCreation);
            console.log(controllerCreation.data)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePlayerCreation = async () => {
        try {
            const controllerDetails = {
                password: "Hope2022*"
            }

            const playerCreation = await axios.post(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_player/6/`, controllerDetails, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log('POST Response:', playerCreation);
            console.log(playerCreation.data)
            if (playerCreation.status === 200) {
                // Successful response
                console.log('Player created successfully:', playerCreation.data);
            } else {
                // Handle other status codes
                console.error('Error creating player. Status code:', playerCreation.status);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [displayControllerModal, setDisplayContollerModal] = useState(false);

    const handleControllerModalSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const controllerPassword = (document.getElementById('controller_password') as HTMLInputElement).value;

        console.log('Controller Password:', controllerPassword);

        try {
            const controllerDetails = {
                password: `${controllerPassword}`
            }

            const controllerCreation = await axios.post(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_controller/6/`, controllerDetails, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log('POST Response:', controllerCreation);
            console.log(controllerCreation.data)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        
        setDisplayContollerModal(false); // Assuming you want to close the modal after submitting
    };

    const RegisterControllerModal = () => (
        <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center">
            <div className="relative w-full max-w-2xl max-h-full">

                <form onSubmit={handleControllerModalSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Controller Registration
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal"
                            onClick={() => {
                                setDisplayContollerModal(false);
                            }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Please enter your preferred controller password:
                        </p>
                        <input type="text" id="controller_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-universal-primary focus:border-universal-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-universal-primary dark:focus:border-universal-primary" placeholder="Controller Password" required />
                    </div>

                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="submit" className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Register
                        </button>
                        <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={() => {
                                setDisplayContollerModal(false);
                            }}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );

    return (
      
            <div className="container w-screen h-screen mx-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mx-4 h-52">
                <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                    <div className="flex flex-col">
                        <p className="text-xl text-gray-400 dark:text-gray-500">
                            Interior Image
                        </p>
                        <div>
                            <img src={ownerInfo?.image_interior} alt="Uploaded" className="mt-2 max-w-full h-44" />
                        </div>
                    </div>
                    
                </div>
                <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 mt-4 sm:mt-0">
                    <div className="flex flex-col">
                        <p className="text-xl text-gray-400 dark:text-gray-500">
                            Exterior Image
                        </p>
                        <div>
                            <img src={ownerInfo?.image_exterior} alt="Uploaded" className="mt-2 max-w-full h-44" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col h-72 my-4 rounded bg-gray-50 dark:bg-gray-800">
                <h3 className="text-2xl font-semibold">Matatu Name </h3>
                <p className="text-xl">Matatu Name: {ownerInfo?.name}</p>
                <p className="text-xl">Number Plate: {ownerInfo?.number_plate}</p>
                <p className="text-xl">Number of Seats: {ownerInfo?.number_of_seats}</p>
                <p className="text-xl">Driver username: {ownerInfo?.driver}</p>
                <p className="text-xl">Matatu Route: {ownerInfo?.route}</p>
                <div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="staticModal" type="button" onClick={handleControllerCreation} className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Controller</button>
                        <button data-modal-hide="staticModal" type="button" onClick={handlePlayerCreation} className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Player</button>

                        <button data-modal-hide="staticModal" type="button" onClick={() => {
                                setDisplayContollerModal(true)
                                }} 
                        className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Player</button>

                    </div>
                </div>

            </div>


            
                    
                    
            {displayControllerModal && <RegisterControllerModal />}    
            </div>
    );
};

export default MatatuDetails;