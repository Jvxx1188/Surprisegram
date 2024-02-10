'use client'
import { redirect } from "next/navigation";
import Link from "next/link";
export default function Home() {
  
  const token = localStorage.getItem('token')
     if(!token) {
      redirect("/login")

      return  <h1>redirecionando</h1>
    }

return (
    <main>
    <div className="">
      <Link href={'/login'}>login</Link>
    </div>
    </main>
  );
}
