import React, { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { ChevronDown ,ChevronUp  } from "lucide-react"
interface PostProps{
    username: string,
    title?: string,
    likesCount : number
}
export function Post({username,title,likesCount} : PostProps){
    const titleLimitSize = 30;
    const [titleSizeClass, setTitleSizeClass] = useState('')
    const [isTitleExpand,setIsTitleExpand] = useState(false)
    const [isTitleLarge,setIsTitleLarge] = useState(false)

    function expandTitle(){
        setIsTitleExpand(!isTitleExpand)
    }
    useEffect(()=>{
        if(!title) return

        if(isTitleLarge && !isTitleExpand){
            setTitleSizeClass(' h-10 ')
        }else{
            setTitleSizeClass('')
        }
        if(title.length > titleLimitSize){
            setIsTitleLarge(true)
        }
    })
    
    return (
        <div className="flex flex-col bg-black rounded-3xl pt-2 px-1">
           <div className="mx-2 flex flex-col gap-1">
           <p className="px-2"><strong>{username}</strong> postou :</p>
            <div className='flex flex-row gap-1 overflow-hidden'>
            <p className={titleSizeClass + "pl-3 pb-1 flex-1"}>{title}</p>

            
            {
            //se titulo for maior que 20 caracteres
            isTitleLarge ? (
                
                //se titulo tiver expandido? renderizar icone
                    isTitleExpand ? (
                        <>
                       
                        <div onClick={expandTitle} 
                        className="bg-white w-8 h-8 relative rounded-full hover:w-9 hover:h-9 hover:cursor-pointer duration-100 active:bg-violet-700">
                        <ChevronDown 
                        size={25} 
                        color="black" 
                        className='absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[46%]'/>
                        </div>
                        </>
                        
                    ) : (
                        <><div onClick={expandTitle} 
                        className="bg-white w-8 h-8 relative rounded-full hover:w-9 hover:h-9 hover:cursor-pointer duration-100 active:bg-violet-700">
                        <ChevronUp 
                        size={25} 
                        color="black" 
                        className='absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[46%]'/>
                        </div>
                        </>
                    )
                
            ) : null}


            </div>
           </div>
            


            <p>{likesCount}</p>
        </div>
    )
    //criar componente de vizualização de objetos post
}

function Usestate(arg0: never[]): [any, any] {
    throw new Error("Function not implemented.")
}
