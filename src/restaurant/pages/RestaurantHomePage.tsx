import {IoAdd } from 'react-icons/io5';
import Backdrop from '../../components/Backdrop';
import UploadIcon from '/uploadicon.svg';
import { useState } from 'react';
export const FeaturedItem = ({title}:{title:string})=>(
    <div className={`w-1/3 min-w-[280px] mx-3 relative flex flex-col cursor-pointer items-center justify-end pb-4 h-44`}>
        <img src="https://picsum.photos/200/300" alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-center"/>
       <div className="absolute  ">
            <h4 className="text-white text-center font-bold text-xl">{title}</h4>
        </div>
    </div>
);
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement>{}
const TextInput=({value,name, ...rest}:TextInputProps)=>(
    <input 
        type="text" 
        {...rest}
        className="border-none my-2 mx-3 bg-gray-300 rounded-lg px-2 py-2 outline-none"
        value={value}
        name={name}
    />
)
export const NewRestaurantModal = ({toggleModal}:{toggleModal:()=>void})=>{
    return(
        <Backdrop>
            <div className='relative w-full overflow-hidden flex flex-col justify-start items-start h-full'>
                <div className='bg-white rounded-lg m-auto h-4/5 w-1/2'>
                    <form className='w-full relative flex flex-col items-center justify-center'>
                        <p className='mt-2 font-bold text-center'>NEW RESTAURANT</p>
                        <button className='absolute rounded border border-text-primary mx-2 px-1 hover:bg-slate-300 top-1 right-0 text-2xl text-text-primary' onClick={toggleModal}>X</button>
                        <div className='grid grid-cols-2 my-4 mx-4'>
                            <TextInput placeholder='Name' value='' name='search'/>
                            <TextInput placeholder='Sitting Capacity' value='' name='search'/>
                            <div className='mx-3 my-2'>
                                <select id="countries" className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-text-primary focus:border-text-primary block w-full  dark:bg-gray-700 dark:border-text-primary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose Location</option>
                                    <option value="US">Ngong road</option>
                                    <option value="CA">Ngara road</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </div>
                            <div className='px-3'>
                                <p className='font-bold'>Please set your preferred Controller and Player Password</p>
                                <TextInput placeholder='Controller Password' value='' name='search'/>
                                <TextInput placeholder='Player Password' value='' name='search'/>
                            </div>
                            <div className='mx-2'>
                                <p className='font-bold'>Photo Interior</p>
                                <div className='border border-black h-40 border-dashed flex flex-col items-center justify-center'>
                                    <img src={UploadIcon} alt="" className='w-20 h-20'/>
                                    <p className='text-lg font-bold'>Drag & drop files or <span className='text-text-primary underline'>Browse</span></p>
                                    <p className='text-text-primary font-light text-sm'>Supported formats: JPEG, PNG, JPG</p>
                                </div>
                            </div>
                            <div className='mx-2'>
                                <p className='font-bold '>Photo Interior</p>
                                <div className='border border-black h-40 border-dashed flex flex-col items-center justify-center'>
                                    <img src={UploadIcon} alt="" className='w-20 h-20'/>
                                    <p className='text-lg font-bold'>Drag & drop files or <span className='text-text-primary underline'>Browse</span></p>
                                    <p className='text-text-primary font-light text-sm'>Supported formats: JPEG, PNG, JPG</p>
                                </div>
                            </div>
                        </div>
                        <button className='bg-text-primary py-1 w-3/5 text-center font-bold text-white px-3 rounded-md'>Register Matatu</button>
                    </form>
                </div>
            </div>
        </Backdrop>
    )
}
function RestaurantHomePage() {
    const [openModal,setOpenModal] = useState(false);
    const toggleModal = ()=>{setOpenModal(!openModal)};
    return (
        <>
            {openModal && <NewRestaurantModal toggleModal={toggleModal} />}
            <div className='w-full mt-8 h-full'>
                <div className='w-full flex items-center justify-between'>
                    <h2 className="text-2xl text-text-primary font-bold">My Restaurants</h2>
                    <button onClick={toggleModal} className="flex items-center justify-between font-bold text-text-primary">
                        <IoAdd className='text-xl border-2 rounded-md border-text-primary mx-2'/>
                        New Restaurant
                    </button>
                </div>
                <div className="w-full mt-5 flex items-center overflow-x-scroll">
                    <FeaturedItem title="Heart want what it wants" />
                    <FeaturedItem title="Live Water" />
                    <FeaturedItem title="Anyone" />
                </div>
            </div>
        </>
    );
}

export default RestaurantHomePage;