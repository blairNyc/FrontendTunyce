import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import axios from 'axios';
import { useParams } from "react-router-dom";

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

interface ControllerPlayerDetails {
    id: number;
    uuid: string;
    password: string;
    matatu: number;
}

const MatatuDetails = () => {

    const { id } = useParams<{ id: string }>();

    const userToken: any = useAppSelector((state: RootState) => state.persistAuth.auth.access);

    // Matatu Information
    const [ownerInfo, setOwnerInformation] = useState<OwnerInterface>();

    const [controllerInfo, setControllerInformation] = useState<ControllerPlayerDetails | null>(null);
    const [playerInfo, setPlayerInformation] = useState<ControllerPlayerDetails | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseRoute = await axios.get(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/update_matatu/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                const data = responseRoute.data;
                setOwnerInformation(data.message)

                const responseController = await axios.get(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/controller/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                const controllerData = responseController.data;
                setControllerInformation(controllerData.message)

                const responsePlayer = await axios.get(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/player/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });               

                const playerData = responsePlayer.data;
                setPlayerInformation(playerData.message)

                

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [userToken, id]);

    const [displaySuccessNotification, setDisplaySuccessNotification] = useState<boolean>(false);
    const [displayErrorNotification, setDisplayErrorNotification] = useState<boolean>(false);
    const [displaySuccessText, setSuccessText] = useState<string>("");
    const [displayErrorText, setDisplayErrorText] = useState<string>("");
    
    const [submittingController, setSubmittingController] = useState<boolean>(false)


    const handleSuccessClosing = () => {
        setDisplaySuccessNotification(false);
    }

    const handleErrorClosing = () => {
        setDisplaySuccessNotification(false);
    }

    useEffect(() => {
        if (displayErrorNotification) {
            setTimeout(() => { setDisplayErrorNotification(!displayErrorNotification) }, 3000);
        }
        if (displaySuccessNotification) {
            setTimeout(() => { setDisplaySuccessNotification(!displayErrorNotification) }, 3000);
        }

    }, [displaySuccessNotification, displayErrorNotification]);

    const [displayControllerModal, setDisplayContollerModal] = useState(false);

    const handleControllerModalSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const controllerPassword = (document.getElementById('controller_password') as HTMLInputElement).value;

        setSubmittingController(true)

        try {
            const controllerDetails = {
                password: `${controllerPassword}`
            }

            await axios.post(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_controller/${id}/`, controllerDetails, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }).then(response => {
                if (response.status == 201) {
                    setDisplayContollerModal(false);
                    setDisplaySuccessNotification(true);
                    setSuccessText("Controller creation successful.")
                    setSubmittingController(false)
                }
            }
            ).catch(error => {
                if (error.response.status == 500) {
                setDisplayErrorNotification(true)
                setDisplayErrorText("Something went wrong, try again later.")
                setSubmittingController(false)
            } else {
                setDisplayErrorNotification(true)
                setDisplayErrorText("Something went wrong, try again.")
                setSubmittingController(false)
            }
        
        }

            )

        } catch (error) {

            console.error('Error fetching data:', error);
        }
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
                        {submittingController ? (
                            <button disabled data-modal-hide="staticModal" type="button" className="text-white bg-disabled-button-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Registering...</button>
                        ) : (
                                <button type="submit" className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Register
                                </button>
                        )}
                        
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

    const [displayPlayerModal, setDisplayPlayerModal] = useState(false);
    const [submittingPlayer, setSubmittingPlayer] = useState<boolean>(false)

    const handlePlayerModalSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const controllerPassword = (document.getElementById('controller_password') as HTMLInputElement).value;

        try {
            const controllerDetails = {
                password: `${controllerPassword}`
            }

            await axios.post(`https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/create_player/${id}/`, controllerDetails, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }).then(response => {
                if (response.status == 201) {
                    setDisplayContollerModal(false);
                    setDisplaySuccessNotification(true);
                    setSuccessText("Player creation successful.")
                    setSubmittingController(false)
                }
            }
            ).catch(error => {
                if (error.response.status == 500) {
                    setDisplayErrorNotification(true)
                    setDisplayErrorText("Something went wrong, try again later.")
                    setSubmittingController(false)
                } else {
                    setDisplayErrorNotification(true)
                    setDisplayErrorText("Something went wrong, try again.")
                    setSubmittingController(false)
                }

            })

           

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const RegisterPlayerModal = () => (
        <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center">
            <div className="relative w-full max-w-2xl max-h-full">

                <form onSubmit={handlePlayerModalSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Player Registration
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal"
                            onClick={() => {
                                setDisplayPlayerModal(false);
                            }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Please enter your preferred player password:
                        </p>
                        <input type="text" id="controller_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-universal-primary focus:border-universal-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-universal-primary dark:focus:border-universal-primary" placeholder="Player Password" required />
                    </div>

                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        {submittingController ? (
                            <button disabled data-modal-hide="staticModal" type="button" className="text-white bg-disabled-button-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Registering...</button>
                        ) : (
                                <button type="submit" className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Register
                                </button>
                        )}                        
                        <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={() => {
                                setDisplayPlayerModal(false);
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

            <div className="flex flex-col h-auto my-4 rounded bg-gray-50 dark:bg-gray-800">
                <h3 className="text-2xl font-semibold">Matatu Name </h3>
                <p className="text-xl">Matatu Name: {ownerInfo?.name}</p>
                <p className="text-xl">Number Plate: {ownerInfo?.number_plate}</p>
                <p className="text-xl">Number of Seats: {ownerInfo?.number_of_seats}</p>
                <p className="text-xl">Matatu Route: {ownerInfo?.route}</p>
                <div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200">
                        {controllerInfo == null && (
                        <button data-modal-hide="staticModal" type="button" onClick={() => {
                                setDisplayContollerModal(true)
                            }}
                                className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Controller</button>)
                        }

                        {playerInfo == null && (
                            <button data-modal-hide="staticModal" type="button" onClick={() => {
                                setDisplayPlayerModal(true)
                            }}
                                className="text-white bg-universal-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Player</button>
                        )}
                    </div>
                </div>

            </div>

            <div>
                {controllerInfo !== null && (
                    <div>
                        <div className="flex flex-col h-auto my-4 rounded bg-gray-50 dark:bg-gray-800">
                            <h3 className="text-2xl font-semibold">Controller Details</h3>
                            <p className="text-xl">Unique Identifier: {controllerInfo?.uuid}</p>
                        </div>

                        <div className="flex flex-col h-auto my-4 rounded bg-gray-50 dark:bg-gray-800">
                            <h3 className="text-2xl font-semibold">Details Details</h3>
                            <p className="text-xl">Unique Identifier: {playerInfo?.uuid}</p>
                        </div>
                    </div>
                )}
            </div>

            {
                displaySuccessNotification &&
                <div className="absolute right-10 top-20 z-50">
                    <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            <span className="sr-only">Check icon</span>
                        </div>
                            <div className="ml-3 text-sm font-normal">{displaySuccessText}</div>
                            <button type="button" onClick={handleSuccessClosing} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            }

            {
                displayErrorNotification &&
                <div className="absolute right-10 top-20 z-50">
                    <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            </svg>
                            <span className="sr-only">Error icon</span>
                        </div>
                            <div className="ml-3 text-sm font-normal">{displayErrorText}</div>
                        <button type="button" onClick={handleErrorClosing} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            }

            {displayControllerModal && <RegisterControllerModal />}
            {displayPlayerModal && <RegisterPlayerModal />}
        </div>
    );
};

export default MatatuDetails;