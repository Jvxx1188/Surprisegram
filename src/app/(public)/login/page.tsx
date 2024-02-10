'use client'
import dotenv from 'dotenv';
import "./globals.css";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"
import {useState, useEffect } from "react";
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
dotenv.config()
const server = process.env.SERVER;

const LoginSchema = z.object({
        email: z.string().email('Preencha corretamente o campo de email'),
        password: z.string().min(6,'senha de no mínimo 6 caracteres')
    });
export default function Login() {
    const router = useRouter()
    //token existe?
function redirectToMain(){
    console.log('redirecting')
    router.push('/')
}

useEffect(()=>{
const token = localStorage.getItem('token')
 if(token) {
         redirectToMain()
         console.log('token existe, redirecionando...')
    } 
},[])   
 
    const [error,setError] = useState('')
    const {
        register,handleSubmit,
        formState: { errors },
      } = useForm<z.infer<typeof LoginSchema>>(
        {resolver : zodResolver(LoginSchema)}
      );
        
   
      

    return <>
    <div className="flex flex-col gap-4">
    <h1 className="text-3xl font-bold">Login</h1>
    
    <form className="flex flex-col gap-4 justify-center " onSubmit={handleSubmit((data)=>PostForm(data,redirectToMain))}>
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
        
        <span className="text-gray-800 ">{`Don't have an account?`} <a className="text-cyan-500 hover:underline" href="/register">Sign Up</a></span>
      <p className='text-red-500 text-end' id="login-return-error"></p>
    </div>
    </>
}


function PostForm(data : any,redirect :()=> void){
    console.log(data) 
     
     axios.post(`${server}/auth/login`,data).then((res)=> {
        
         //reset error tag
         const errorTag = document.getElementById('login-return-error')
         if(!errorTag) return console.log('nulo', errorTag)
         errorTag.innerHTML = ''

         //return window.location.replace("/register");
         const {token} =JSON.parse(res.request.response);
         console.log(typeof token)
         localStorage.setItem('token',token)
         console.log(token)
         return redirect()
     }).catch(async (err)=> {

        const errorTag = document.getElementById('login-return-error')
         if(!errorTag) return 
        //se o servidor estiver offline
        if(!err.request.response) return toast.error('Servidor possívelmente offline');
        //se realmente deu erro
         const error =await JSON.parse(err.request.response).error
         
        return toast.error(error);
     })

 //chamar a api na rota publica(onde nao tem jwt e todo mundo pode)
 
 }
//BY JVXX