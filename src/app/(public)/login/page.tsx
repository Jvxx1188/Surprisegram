'use client'

import "./globals.css";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect } from "react";
import { json } from "stream/consumers";


const LoginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });
export default function Login() {
    const {
        register,handleSubmit,
        formState: { errors },
      } = useForm<z.infer<typeof LoginSchema>>(
        {resolver : zodResolver(LoginSchema)}
      );
    
       useEffect(() => {
        console.log(errors)
       })


      const erros = JSON.stringify(errors);
      
    return <>
    <div className="flex flex-col gap-4">
    <h1 className="text-3xl font-bold">Login</h1>
    
    <form className="flex flex-col gap-4 justify-center " onSubmit={handleSubmit((data) => console.log(data))}>
        {/*EMAIL*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500 " htmlFor="email">Enter your email</label>
            <input {...register("email")} className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="email" id="email" name="email"/>
        </div>
       
        {/*PASSWORD*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500" htmlFor="password">Enter your password</label>
            <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="password" id="password" {...register("password")}/>
        </div>
        
        <button type="submit" className="bg-green-400 w-20 p-3 rounded-xl flex self-center justify-center duration-200 hover:bg-black hover:text-white">Continue</button>
      <p>errors</p>
        </form>
        
    </div>
    </>
}