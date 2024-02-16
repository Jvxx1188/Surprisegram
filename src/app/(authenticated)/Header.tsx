

'use client'
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
export default function Header(){
  const url = process.env.SERVER
  const {push} = useRouter()
  const [user,setUser] = useState({username : '', email : ''})
 useEffect(()=>{
  const tokenExists= localStorage.getItem('token')
  
  if(!tokenExists) { push('/login'); return console.log('token não existe, redirecionando...') } 

  
 axios.get(url + '/get/user',{headers : {Authorization : 'Bearer '+tokenExists}}).then((query)=> setUser(query.data.user)).catch((err)=>toast.error(err.message) && console.log(err))

},[])   
 
return <div className="bg-violet-800 m-3 rounded-xl px-3 py-2 flex row justify-between items-center gap-2">
  {user.username ? (
    <>
  <p className="tracking-wide">Logado como : <strong>{user.username}</strong></p>

  <div className="bg-violet-950 rounded-3xl font-bold py-2 px-2 flex flex-row gap-2 hover:bg-lime-700 hover:cursor-pointer select-none">
<p>Add post</p>
<PlusCircle/>
  </div>
  </>
  ) : (<p className="animate-pulse">Conectando...</p>)}
</div>
}