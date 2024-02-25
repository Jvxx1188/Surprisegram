'use client'

import Link from "next/link";
import { Post } from "@/components/post";
export default function Home() {
 
return (

  
    <main id="post-container" className="px-1 flex flex-col gap-3 max-w-2xl mx-auto">
      <Post imgUrl="https://asllanmaciel.com.br/wp-content/uploads/2021/09/css3-thumb.jpg" username="Jvxx" title="" likesCount={3}/>
      <Post username="Jvxx" title="meu primeiro post porem é um lorem meu primeiro post porem é um lorem  meu primeiro post porem é um lorem meu primeiro post porem é um lorem meu primeiro post porem é um lorem meu primeiro post porem é um lorem meu primeiro post porem é um lorem " likesCount={3}/>
      <Post imgUrl="https://asllanmaciel.com.br/wp-content/uploads/2021/09/css3-thumb.jpg" username="Jvxx" title="meu primeiro post porem é um lorem ispurmeu primeiro post porem é um lorem ispurmeu meu primeiro post porem é um lorem ispurmeu primeiro post porem é um lorem ispurmeu" likesCount={3}/>
      <Post username="Jvxx" title="meu primeiro post porem é um lorem ispurmeu primeiro post porem é um lorem ispurmeu" likesCount={3}/>
      <Post username="Jvxx" title="meu primeiro post porem é um lorem ispurmeu primeiro post porem é um lorem ispurmeu" likesCount={3}/>
      <Post username="Jvxx" title="meu primeiro post porem é um lorem ispurmeu primeiro post porem é um lorem ispurmeu" likesCount={3}/>
      <Post username="Jvxx" title="meu primeiro post porem é um lorem ispurmeu primeiro post porem é um lorem ispurmeu" likesCount={3}/>
      <Post  username="Jvxx" title="meu primeiro post porem é um lorem ispurmeu primeiro post porem é um lorem ispurmeu" likesCount={3}/>

    </main>
  );
}


//função que primeiro
