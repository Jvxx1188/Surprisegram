'use client'
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {useEffect} from 'react'
export default function Home() {
  const {push} = useRouter();
  useEffect(()=>{
    console.log('usefect')
const token = localStorage.getItem('token')
 if(!token) {
    
         push('/login')
         console.log('token não existe, redirecionando...')
    } 
},[])   
 

return (
    <main>
    <div className="">
      <Link href={'/login'}>login</Link>
    </div>
    </main>
  );
}


//função que primeiro
