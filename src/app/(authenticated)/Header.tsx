

'use client'
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AddPostComponent } from "@/components/addPostComponent";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
export default function Header(){
  const url = process.env.SERVER
  
  const {push} = useRouter()
  const [user,setUser] = useState({username : '', email : ''})

  //token existe e get do usuario no cabeçalho
 useEffect(()=>{
  const tokenExists= localStorage.getItem('token')
  if(!tokenExists) { push('/login'); return console.log('token não existe, redirecionando...') } 
  
  if (!url) return console.log('env do server nulo')
  //pegando os dados para mostrar no header
  getUserInformations(url,tokenExists,setUser,push)
},[])   
 
return <div className="bg-violet-800 m-3 rounded-xl px-3 py-2 flex row justify-between items-center gap-2">
  {user.username ? (
    <>
  <p className="tracking-wide">Logado como : <strong>{user.username}</strong></p>

<AddPostComponent/>
  
  </>
  ) : (<p className="animate-pulse">Conectando...</p>)}
</div>
}

function getUserInformations(url : string,tokenExists : string, setUser: Dispatch<SetStateAction<{username: string;email: string;}>>  ,push : (href: string, options?: NavigateOptions | undefined) => void){
  console.log('adquirindo infomações')
  axios.get(url + '/get/user',{headers : {Authorization : 'Bearer '+tokenExists}}).then((query)=> {setUser(query.data); console.log(query.data)}).catch((err)=>{
    //se der erro
    if(err.response.data.error){
      toast.error(err.response.data.error)
    }else{
      toast.error(err.message)
    }
    //se o erro for relacionado a jwt
   if(err.response.data.jwt){
    console.log('removendo jwt')
      localStorage.removeItem('token')
      push('/login')
   }
   })
}
