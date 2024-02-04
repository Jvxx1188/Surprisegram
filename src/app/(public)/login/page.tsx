'use client'
import dotenv from 'dotenv';
import "./globals.css";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"
import {useState, useEffect } from "react";
import { json } from "stream/consumers";
import axios from 'axios'
dotenv.config()
const server = process.env.SERVER;

const LoginSchema = z.object({
        email: z.string().email('Preencha corretamente o campo de email'),
        password: z.string().min(6,'senha de no mínimo 6 caracteres')
    });
export default function Login() {
    const [error,setError] = useState('')
    const ChangeError = useCallback
    const {
        register,handleSubmit,
        formState: { errors },
      } = useForm<z.infer<typeof LoginSchema>>(
        {resolver : zodResolver(LoginSchema)}
      );

    return <>
    <div className="flex flex-col gap-4">
    <h1 className="text-3xl font-bold">Login</h1>
    
    <form className="flex flex-col gap-4 justify-center " onSubmit={handleSubmit((data)=>PostForm(data))}>
        {/*EMAIL*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500 " htmlFor="email">Enter your email</label>
            <input {...register("email")} className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="email" id="email" name="email"/>
        </div>
       {errors.email && <p>errors.email.message</p>}
        {/*PASSWORD*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500" htmlFor="password">Enter your password</label>
            <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="password" id="password" {...register("password")}/>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" className="bg-green-400 w-20 p-3 rounded-xl flex self-center justify-center duration-200 hover:bg-black hover:text-white">Continue</button>
      
        </form>
        
    </div>
    </>
}

function PostForm(data){
   console.log(data)
    axios.post(`${server}/auth/login`,data).then((res)=> {
        console.log(res)
    }).catch((err)=> {
        console.log(err.request.response)
    })
//chamar a api na rota publica(onde nao tem jwt e todo mundo pode)

}