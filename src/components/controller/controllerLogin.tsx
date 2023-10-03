import {Card, Checkbox, Label } from 'flowbite-react';
import LogoImage from '../../assets/tunyce_logo.svg';
import { useNavigate } from 'react-router-dom';
import {useForm,SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLoginAsControllerMutation } from '../../app/features/content/contentApiSlice';
import { useAppDispatch } from '../../app/hooks';
import { switchUser } from '../auth/auth/authSlice';
import { SnackBar } from '../auth/userLogin';
import LoadingSpinner from '../LoadingSpinner';
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement>{}
export const TextInput = ({id,type,placeholder,...rest}:TextInputProps)=>(
    <input 
        type={type} 
        id={id}   
        {...rest} 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder={placeholder}
    />
)
interface registrationInput{
    uuid:string
    password:string
}
const schema = yup.object({
    uuid: yup.string().required(),
    password: yup.string().required(),
}).required()
type ErrorType = { 
    status:number, 
    data:{
        [key:string]:string
    }
}
export default function ControllerLogin() {
    const navigate = useNavigate();
    const [loginAsController,{isError,status,isLoading, error:resErr} ] = useLoginAsControllerMutation();
    const {handleSubmit,register,formState: { errors }} = useForm<registrationInput>({
      resolver: yupResolver(schema),
    })
    const dispatch = useAppDispatch();
    const onSubmit:SubmitHandler<registrationInput> = async (data: {uuid:string,password:string}) => {
        const userData = {
            uuid: data.uuid,
            password: data.password,
        }
        console.log(userData);
        try {
            const response = await loginAsController(userData).unwrap();
            console.log(response)
            dispatch(switchUser('is_controller'))
            navigate('/controller-creators');
        } catch (error ) {
            return;
        }
    }
    console.log('Error',isError,status,resErr);
    return (
        <>
            {isError &&
                Object.values((resErr as ErrorType).data).map((err:string,idx: number)=><SnackBar key={idx} text={err??'Error encountered'} />)
            }
            {
                isLoading &&(
                    <LoadingSpinner />
                )
            }
            <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
                <Card>
                    <div className="sm:mx-auto sm:w-[36rem] sm:max-w-full"> 
                        <img
                            className="mx-auto h-16 w-auto"
                            src={LogoImage}
                            alt="Tunyce Media"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your Controller account
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[36rem]"> 
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="UUID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UUID</label>
                            <div className="relative mb-4">
                                {/* <TextInput
                                    {...register("uuid")} 
                                    type="text"
                                    id="uuid"
                                    placeholder="Enter Unique Indentifier"
                                /> */}
                                <input type="text" id="uuid"   {...register("uuid")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter UUID"/>

                                <p className='text-red-900'>{errors.uuid?.message}</p>
                            </div>  
                            <div>

                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password"
                                        value="Your password"
                                    />
                                </div>
                                <input {...register("password")}  
                                    type="text" id="password" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password"/>

                                 
                                <p className='text-red-900'>{errors.password?.message}</p>
                            </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">
                                Remember me
                            </Label>
                        </div>
                        <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Login</button>
                        
                        </form>
                    </div>
                </Card>
            </div>
        </>   
    )
}


