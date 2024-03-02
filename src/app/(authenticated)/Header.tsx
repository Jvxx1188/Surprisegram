

'use client'
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import useSwr from 'swr'
import { toast } from "sonner";
import { AddPostComponent } from "@/components/addPostComponent";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
export default function Header(){
  const url = 'http://localhost:5000'
  const {push} = useRouter()
  interface userInter{ email : string, username : string }
  const {data} = GetUserFetch<userInter>(url,push) 

    return <div 
    className="bg-violet-800 m-3  rounded-xl px-3  py-2 flex row justify-between items-center gap-2">
      {
      data?.username ? (
        <>
      <p className="tracking-wide">Logado como : <strong>{(data.username)}</strong></p>
      <AddPostComponent/>
        </>
      ) 
      : 
      (
      <p className="animate-pulse">Conectando...</p>
      )}
    </div>
}

function GetUserFetch<Data = any>(url : string, push : (href: string, options?: NavigateOptions | undefined) => void){
   const {data,error} = useSwr<Data>(url+'/get/user',async (thisUrl : string)=>{
    //token exists
    const tokenExists= localStorage.getItem('token')
    if(!tokenExists) { push('/login'); return console.log('token não existe, redirecionando...') } 
 //fetch with token in headers
 
 
 const data = await fetch(thisUrl,{
      headers : {
        Authorization : 'Bearer '+tokenExists
      }
     });
     //header in json
     const response = await data.json()

     //validação de erros
     if(response.error){
      console.log('enviando toast')
      toast.error(response.error)
      //se o erro for relacionado a jwt
      if(response.jwt){
        console.log('removendo jwt')
          localStorage.removeItem('token')
          push('/login')
         console.log(response)
       }
    }
     //the return data
     return response;
  })   
  if(error){
    console.log('deu erro')
      toast.error(error.message)
  }
  return {data,error}
}
