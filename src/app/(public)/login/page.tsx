'use client'
import dotenv from 'dotenv';
import "./globals.css";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"
import {useState, useEffect } from "react";
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation';
dotenv.config()
const server = process.env.SERVER;

const LoginSchema = z.object({
        email: z.string().email('Preencha corretamente o campo de email'),
        password: z.string().min(6,'senha de no mínimo 6 caracteres')
    });
export default function Login() {
    //token existe?


    const [error,setError] = useState('')
    const {
        register,handleSubmit,
        formState: { errors },
      } = useForm<z.infer<typeof LoginSchema>>(
        {resolver : zodResolver(LoginSchema)}
      );
        
    const token = localStorage.getItem('token')
    if(token) {
        redirect("/")

        return <h1>Redirecionando</h1>
    }
      

    return <>
    <div className="flex flex-col gap-4">
    <h1 className="text-3xl font-bold">Login</h1>
    
    <form className="flex flex-col gap-4 justify-center " onSubmit={handleSubmit((data)=>PostForm(data))}>
        {/*EMAIL*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500 " htmlFor="email">Enter your email</label>
            <input {...register("email")} className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="email" id="email" name="email"/>
        </div>
       {errors.email && <p>{errors.email.message}</p>}
        {/*PASSWORD*/}
        <div className="flex flex-col gap-4">
            <label className="text-gray-500" htmlFor="password">Enter your password</label>
            <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="password" id="password" {...register("password")}/>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" className="bg-green-400 w-20 p-3 rounded-xl flex self-center justify-center duration-200 hover:bg-black hover:text-white">Continue</button>
      
        </form>
        
        <span className="text-gray-800 ">{`Don't have an account?`} <Link className="text-cyan-500 hover:underline" href="/register">Sign Up</Link></span>
      <p className='text-red-500 text-end' id="login-return-error"></p>
    </div>
    </>
}


function PostForm(data){
    console.log(data) 
     
     axios.post(`${server}/auth/login`,data).then((res)=> {
         //reset error tag
         const errorTag = document.getElementById('login-return-error')
         if(!errorTag) return console.log('nulo', errorTag)
         errorTag.innerHTML = ''

         //return window.location.replace("/register");
         const obj =JSON.parse(res.request.response);
         console.log(typeof obj)
         console.log(obj.token)
         localStorage.setItem('token',obj.token)
     }).catch(async (err)=> {
        const errorTag = document.getElementById('login-return-error')
         if(!errorTag) return console.log('nulo', errorTag)
        //se o servidor estiver offline
        if(!err.request.response) return errorTag.innerHTML = 'servidor possívelmente offline';
        //se realmente deu erro
         const error =await JSON.parse(err.request.response).error
         errorTag.innerHTML = 'Erro : ' + error;
     
     })

 //chamar a api na rota publica(onde nao tem jwt e todo mundo pode)
 
 }
 
//BY JVXX