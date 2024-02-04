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

const RegisterSchema = z.object({
        username : z.string().min(4,'nome de no mínimo 4 caracteres'),
        email: z.string().email('Preencha corretamente o campo de email'),
        password: z.string().min(6,'senha de no mínimo 6 caracteres'),
        confirmPassword: z.string(),
    }).refine(
        (value)=>{
            return value.password === value.confirmPassword;
        }
    ,
    {
        message: "Confirmação de senha é diferente da senha",
        path: ["confirmPassword"]
    }
    );

export default function Login() {
    const [error,setError] = useState('')
    
    const {
        register,handleSubmit,
        formState: { errors },
      } = useForm<z.infer<typeof LoginSchema>>(
        {resolver : zodResolver(RegisterSchema)}
      );

    return <>
    <div className="flex flex-col gap-6">
    <h1 className="text-3xl font-bold">Register</h1>
    
    <form className="flex flex-col gap-4 justify-center " onSubmit={handleSubmit((data)=>PostFormRegister(data))}>
        
        {/*Username*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500 " htmlFor="email">Enter your username</label>
            <input  className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="text" id="text" name="text" {...register("username")}/>
        </div>
        {errors.username && <p>errors.username.message</p>}
        {/*EMAIL*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500 " htmlFor="email">Enter your email</label>
            <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="email" id="email"  {...register("email")}/>
        </div>
       {errors.email && <p>errors.email.message</p>}

        {/*PASSWORD*/}
        
        <div className="flex flex-col gap-4">
            <label className="text-gray-500" htmlFor="password">Enter your password</label>
            <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="password" id="confirmpassword" {...register("password")}/>
        </div>
        {/*COMFIRM PASSWORD */}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500" htmlFor="password">Confirm password</label>
            <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="password" id="confirmpassword" {...register("confirmPassword")}/>
        </div>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" className="bg-green-400 w-20 p-3 rounded-xl flex self-center justify-center duration-200 hover:bg-black hover:text-white">Continue</button>
      
        </form>
        
    </div>
    </>
}

function PostFormRegister(data){
   console.log(data)

    axios.post(`${server}/auth/register`,data).then((res)=> {
        console.log(res.data)
    }).catch((err)=> {
        console.log(err.request.response)
    })
//chamar a api na rota publica(onde nao tem jwt e todo mundo pode)

}