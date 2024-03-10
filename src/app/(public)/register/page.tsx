'use client'
import dotenv from 'dotenv';
import "./globals.css";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect } from "react";
import { json } from "stream/consumers";
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { serverUrl } from '@/lib/utils';
dotenv.config()
const server = serverUrl()

const RegisterSchema = z.object({
    username: z.string().min(4, 'nome de no mínimo 4 caracteres'),
    email: z.string().email('Preencha corretamente o campo de email'),
    password: z.string().min(6, 'senha de no mínimo 6 caracteres'),
    confirmPassword: z.string(),
}).refine(
    (value) => {
        return value.password === value.confirmPassword;
    }
    ,
    {
        message: "Confirmação de senha é diferente da senha",
        path: ["confirmPassword"]
    }
);

export default function Register() {
    const router = useRouter()
    const [isSubmiting, setIsSubmiting] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            redirectToMain()
            console.log('token existe, redirecionando...')
        }
    }, [])

    function redirectToMain() {
        console.log('redirecting')
        router.push('/login')
    }


    const {
        register, handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof RegisterSchema>>(
        { resolver: zodResolver(RegisterSchema) }
    );

    return <>
        <div className="flex flex-col gap-6 ">
            <h1 className="text-3xl font-bold">Register</h1>

            <form className="flex flex-col gap-4 justify-center " onSubmit={handleSubmit((data) => PostFormRegister(data, redirectToMain, isSubmiting, setIsSubmiting))}>

                {/*Username*/}
                <div className="flex flex-col gap-4">
                    <label className="text-gray-500 " htmlFor="username">Enter your username</label>
                    <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="text" id="username" {...register("username")} />
                </div>
                {errors.username && <p>errors.username.message</p>}
                {/*EMAIL*/}
                <div className="flex flex-col gap-4">
                    <label className="text-gray-500 " htmlFor="email">Enter your email</label>
                    <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="email" id="email"  {...register("email")} />
                </div>
                {errors.email && <p>errors.email.message</p>}

                {/*PASSWORD*/}

                <div className="flex flex-col gap-4">
                    <label className="text-gray-500" htmlFor="password">Enter your password</label>
                    <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="password" id="confirmpassword" {...register("password")} />
                </div>
                {/*COMFIRM PASSWORD */}
                <div className="flex flex-col gap-4">
                    <label className="text-gray-500" htmlFor="password">Confirm password</label>
                    <input className=" outline-none border-b-2 transition duration-300 focus:border-gray-700" type="password" id="confirmpassword" {...register("confirmPassword")} />
                </div>
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit" className="bg-green-400 p-3 rounded-xl flex self-center justify-center duration-200 hover:bg-black hover:text-white">
                    {isSubmiting ? 'Registrando' : 'Registrar'}
                </button>


            </form>
            <span className="text-gray-800">Already have an account? <Link className="text-cyan-500 text-underline hover:underline" href="/login">Sing in</Link></span>
            <p className='text-red-500 text-end' id="register-return-error"></p>
        </div>
    </>
}

function PostFormRegister(data: any, redirect: () => void, isSubmiting: boolean, SetisSubmiting: (bol: boolean) => void) {
    if (isSubmiting) return console.log('ja submitando');
    SetisSubmiting(true)
    const errorTag = document.getElementById('register-return-error')
    if (!errorTag) return console.log('nulo', errorTag)


    console.log(data)

    axios.post(`${server}/auth/register`, data).then((res) => {
        errorTag.innerHTML = ''
        toast.success('Sucesso, redirecionando...')
        redirect()
    }).catch(async (err) => {
        //se o servidor estiver offline
        if (!err.request.response) return errorTag.innerHTML = 'servidor possívelmente offline';
        //erros de server
        const error = await JSON.parse(err.request.response).error

        SetisSubmiting(false)
        return toast.error(error);

    })
    //chamar a api na rota publica(onde nao tem jwt e todo mundo pode)

}
