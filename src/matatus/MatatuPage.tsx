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
	
	const navigate = useNavigate();
	const openModal = () => {
		setIsModalOpen(true);
	};

	const [isLoading, setIsLoading] = useState<boolean>(true)
	
	const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);

	const [data, setMatData] = useState<any>()

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

			<AddMatatuModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
}
export default MatatuPage;
