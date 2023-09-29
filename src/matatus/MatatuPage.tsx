import { useEffect, useState } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import AddMatatuModal from "./AddMatatuPage";
import { useGetAllMatatusQuery } from "../app/features/content/contentApiSlice";
import LoadingSkeletonList from "../components/LoadingSkeletonList";
import { IMatatuType } from "../types";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import axios from 'axios';
function MatatuPage(){
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { data, isLoading } = useGetAllMatatusQuery(1);
	const openModal = () => {
		setIsModalOpen(true);
	};

	console.log(data)

	const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);

	// const [data, setMatData] = useState<any>()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/matatu/matatus', {
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});

				const data = responseRoute.data;
				console.log(data);
				// setMatData(data.message)

				// setOwnerInformation(data.message)

			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();

	}, [userToken]);


	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			{isLoading && <LoadingSkeletonList/>}
			<div className="container">
				{/*Title */}
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
				{
					data?.map((matatu:IMatatuType) => (
						<div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end">
						<h5 className="ml-3">{matatu.name}</h5>
						</div>
					))
				}
			</div>
			{/* Render the modal */}
			<AddMatatuModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
}
export default MatatuPage;
