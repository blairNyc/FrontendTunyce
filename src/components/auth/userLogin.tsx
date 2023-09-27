import React from 'react';
import {Card, Checkbox, Label } from 'flowbite-react';
import LogoImage from '../../assets/tunyce_logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector} from '../../app/hooks'
import {useForm,SubmitHandler } from 'react-hook-form'
import { useLoginUserMutation } from '../../app/api/apiAuthorizationSlice'
import { setCredentials } from './auth/authSlice';
import { AiOutlineClose } from 'react-icons/ai';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RootState } from '../../app/store';

export const SnackBar=({text}:{text:string| number})=>(
    <div className='absolute flex items-center justify-between px-4 top-8 my-1 py-1 w-1/3 bg-red-500 min-w-[250px] rounded-2xl left-1/4 md:left-1/3 '>
        <p className='text-center font-bold text-sm text-white'>{text}</p>
        <AiOutlineClose className='text-white cursor-pointer text-lg font-bold'/>
    </div>
)

interface registrationInput{
    email:string
    password:string
}
type ErrorType = { 
    status:number, 
    data:{
        [key:string]:string
    }
}
const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
}).required()
export default function UserLogin() {
    const access = useAppSelector((state: RootState) => state.persistAuth.auth.access);
    const curr = useAppSelector((state:RootState)=>state.persistAuth.auth.curr_loggedin_user);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [loginUser,{isError, error}] = useLoginUserMutation()
    console.log('Access token',access,curr);
    React.useEffect(() => {
        if (access) {
            navigate('/home')
        }
    }, [access, navigate])
    
    const {handleSubmit,register,formState: { errors }} = useForm<registrationInput>({
      resolver: yupResolver(schema),
    })

    const onSubmit:SubmitHandler<registrationInput> = async (data: {email:string,password:string}) => {
        const userData = {
            email: data.email,
            password: data.password,
        }
        console.log(userData);
        try {
            const userAuth = await loginUser(userData).unwrap();
            console.log(userAuth);
            const response = {
                auth:{
                    ...userAuth
                }
            };
            dispatch(setCredentials(response));
            navigate('/home');
        } catch (error ) {
            // const err = error as ErrorType
            console.log('Error encountered: ',error)
        }
    }
    return (
        <>
            {isError&&
                Object.values((error as ErrorType).data).map((err:string,idx: number)=><SnackBar key={idx} text={err} />)
            
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
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[36rem]"> 
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                </svg>
                            </div>
                            <input type="text" id="email"   {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Email"/>
                            <p className='text-red-900'>{errors.email?.message}</p>
                        </div>  
                        <div>

                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password"
                                    value="Your password"
                                />
                            </div>
                                <input {...register("password")}  type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password">
                            </input>
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
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Forgot your password?{' '}
                            <a href="#" className="font-semibold leading-6 text-red-600 hover:text-red-400">
                            Reset password now
                            </a>
                        </p>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="/signup" className="font-semibold leading-6 text-red-600 hover:text-red-400">
                                Start your journey
                            </a>
                        </p>
                    </div>
                </Card>
            </div>
        </>   
    )
}


