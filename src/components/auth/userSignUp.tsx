import { Card, Label } from 'flowbite-react';
import { useState } from 'react';
import LogoImage from '../../assets/tunyce_logo.svg';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from './auth/apiRegisterUserSlice'
import * as yup from "yup";
import { SnackBar } from './userLogin';
interface IRegistrationInput{
    username:string
    phone_number:string
    email:string
    password:string
}
const schema = yup
  .object({
    email: yup.string().email().required(),
    username: yup.string().required(),
    phone_number: yup.string().required(),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be less than 20 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character'
      )
      .required(),
  })
  .required()

export default function UserSignUp() {
    const { register, handleSubmit,formState: { errors }} = useForm<IRegistrationInput>({
        resolver: yupResolver(schema),
    })
    const [registerUser,{isLoading,isError,error}] = useRegisterUserMutation()
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit: SubmitHandler<IRegistrationInput> = async (data: {username:string,email:string, phone_number:string,password:string}) => {
        const userData = {
            phone_number: data.phone_number,
            password: data.password,
            email: data.email,
            username: data.username,
        }
        console.log(userData,'user data');
        try {
            await registerUser(userData).unwrap()

            setSuccessMessage('Registration successful!');
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Registration failed. Please try again.'); 
        }
    }

  return (
    <>
        {isError&&(
            <SnackBar text={error as string} />
        )}
        <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            <Card>
                <div className="sm:mx-auto sm:w-[36rem] sm:max-w-full"> 
                    <img
                    className="mx-auto h-16 w-auto"
                    src={LogoImage}
                    alt="Tunyce Media"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register your account now
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[36rem]"> 
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                <input type="text" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="User name" {...register("username")} required>
                                </input>
                                <p className='text-red-900'>{errors.username?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input type="text" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number" {...register("phone_number")} required>
                                </input>
                                <p className='text-red-900'>{errors.phone_number?.message}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Email" {...register("email")}/>
                                <p className='text-red-900'>{errors.email?.message}</p>
                            </div> 
                        </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password"
                                value="Your password"
                            />
                        </div>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" {...register("password")}>
                        </input>
                        <p className='text-red-900'>{errors.password?.message}</p>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="passwordConfirm"
                                value="Confirm password"
                            />
                        </div>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" {...register("password")}>
                        </input>
                    </div>  
                    <button type="submit" disabled={isLoading} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                    {successMessage && <div className="success text-green-900 flex items-center justify-center">{successMessage}</div>}
                    {errorMessage && <div className="error text-red-900 flex items-center justify-center">{errorMessage}</div>}
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Alreade a member?{' '}
                        <a href="/login" className="font-semibold leading-6 text-red-600 hover:text-red-400">
                            Login Now
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    </>
  )
}


