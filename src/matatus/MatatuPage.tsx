import { useEffect, useState } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import AddMatatuModal from "./AddMatatuPage";
// import { useGetAllMatatusQuery } from "./state";
import LoadingSkeletonList from "../components/LoadingSkeletonList";
import { IMatatuType } from "../types";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function MatatuPage() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleSuccessClosing = () => {
		setDisplaySuccessNotification(false);
	}

	
	const navigate = useNavigate();
	const openModal = () => {
		setIsModalOpen(true);
	};

	const [isLoading, setIsLoading] = useState<boolean>(true)
	
	const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);

	const [data, setMatData] = useState<any>()

	const [displaySuccessNotification, setDisplaySuccessNotification] = useState<boolean>(false);

	useEffect(() => {

		const fetchData = async () => {
			try {
				setIsLoading(true)

				const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/matatus', {
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});

				const data = responseRoute.data;
				console.log(data)

				setMatData(data.message)

			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

	}, [userToken]);

	const handleClick = (matatuId : any) => {
		navigate(`/matatu-details/${matatuId}`)
	}

	const closeModal = () => {
		setIsModalOpen(false);
	};

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
			{
				isLoading ? (
					<LoadingSkeletonList />
				) : (
					<div>
						<div className="container">
							<div className="flex justify-between my-3 px-2 text-red-500">
								<div className="">
									<h3 className="font-bold">My Matatus</h3>
								</div>
								<div className=" flex">
									<button className="flex items-center border p-1" onClick={openModal}>
										<VscDiffAdded />
										<h4 className="ml-2 mr-3">New Matatu</h4>
									</button>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-4 gap-4">
							{data?.map((matatu: IMatatuType) => (
								<div onClick={() => {
								const matId : any = matatu.id
								handleClick(matId) }} className={`w-1/3 min-w-[280px] mx-3 relative flex flex-col cursor-pointer items-center justify-end pb-4 h-48`}>
									<img src={matatu.image_exterior} alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-center" />
									<div className="absolute  ">
										<h4 className="text-white text-center font-bold text-xl">{matatu.name}</h4>
									</div>
								</div>

								// <div onClick={() => { 
								// 	const matId : any = matatu.id
								// 	handleClick(matId) }} className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end hover:cursor-pointer">
								// 	<h5 className="ml-3">{matatu.name}</h5>
								// </div>
							))}
						</div>
					</div>
				)
			}

			<AddMatatuModal isOpen={isModalOpen} onClose={closeModal} isRegistrationSuccessFull={successRegistration} />

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
export default MatatuPage;
