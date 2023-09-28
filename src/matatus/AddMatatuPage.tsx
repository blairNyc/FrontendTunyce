/* eslint-disable react-hooks/rules-of-hooks */
import { MdCloudUpload } from "react-icons/md";
import { useCreateMatatuMutation } from "./state";
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import Backdrop from "../components/Backdrop";
import { useAppSelector } from "../app/hooks";

interface registrationInput {
  name: string
  number_plate: string
  route: number
  number_of_seats: number
  is_trial?: boolean
  image_interior?: string
  image_exterior?: string

}

const schema = yup.object({
  name: yup.string().required(),
  number_plate: yup.string().required(),
  number_of_seats: yup.number().required(),
  route: yup.number().required(),
  is_trial: yup.boolean(),
  image_exterior: yup.string(),
  image_interior: yup.string()
}).required()
function AddMatatuModal({ isOpen, onClose }:{isOpen:boolean, onClose:()=>void}) {
    if (!isOpen) return null;
    const { handleSubmit, register } = useForm<registrationInput>({
        resolver: yupResolver(schema),
    })
    const [createMat] = useCreateMatatuMutation();
    const userName = useAppSelector((state)=>state.persistAuth.auth.username);
    const onSubmit: SubmitHandler<registrationInput> = async (data: registrationInput)=>{
        console.log(data);
        const userData = {
            ...data,
            image_exterior: 'https://picsum.photos/200/300',
            image_interior:'https://picsum.photos/200/300',
            is_trial: true,
            driver: userName,
        }
        console.log(userData)
        const response = await createMat(userData).unwrap()
        console.log(response);
    }
    return (
        <Backdrop>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-container bg-white rounded-md mx-auto">
                {/* Add your modal content here */}
                <div className="modal-content">
                    {/* Add form or content for adding a matatu */}
                    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col mr-5 ml-5" action="">
                        <h2>New Matatu</h2>
                        <div className="grid grid-cols-2 gap-4 ">
                            <div className="mb-6">
                            <input
                                type="text"
                                id="name"
                                {...register("name")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Name"
                                required
                            />
                            </div>
                            <div className="mb-6">
                            <input
                                type="text"
                                id="plate"
                                {...register("number_plate")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Number of Plate"
                                required
                            />
                            </div>
                            <div className="mb-6">
                            <input
                                type="text"
                                id="route"
                                {...register("route")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Route"
                                required
                            />
                            </div>
                            <div className="mb-6">
                            <input
                                type="text"
                                id="seats"
                                {...register("number_of_seats")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Number of Seats"
                                required
                            />
                            </div>
                        </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                        <h4>Photo Interior</h4>
                        <div className=" flex flex-col items-center justify-items-center w-60 h-32 rounded-md shadow-md border border-dashed border-black mr-3">
                            <div className="">
                            <button>
                                <MdCloudUpload />
                            </button>
                            </div>
                            <div className="">
                                <p>Drag & Drop files or Browser</p>
                            </div>
                            <div className="">
                                <p className="text-xs">Supported formats JPENG,PNG</p>
                            </div>
                        </div>
                        </div>
                        <div className="flex flex-col">
                            <h4>Photo Exterior</h4>
                            <div className=" flex flex-col  items-center justify-items-center w-60 h-32 rounded-md shadow-md border border-dashed border-black  ">
                                <div className="">
                                <button>
                                    <MdCloudUpload />
                                </button>
                                </div>
                                <div className="">
                                    <p>Drag & Drop files or Browser</p>
                                </div>
                                <div className="">
                                    <p className="text-xs">Supported formats JPENG,PNG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-red-600 text-white rounded-lg w-60 mt-6">
                            Submit
                        </button>
                    </div>
                    </form>

                    <button onClick={onClose}>Close</button>
                </div>
                </div>
            </div>
        </Backdrop>
    );
}

export default AddMatatuModal;
