import React from "react"
import Image from 'next/image'
import { ChevronDown ,ChevronUp  } from "lucide-react"
interface PostProps{
    username: string,
    title?: string,
    likesCount : number
}
export function Post({username,title,likesCount} : PostProps){

    const [isTitleExpand,setIsTitleExpand] = useState(false)

    return (
        <div className="flex flex-col bg-black rounded-3xl pt-2 px-1">
           <div className="mx-2 flex flex-col">
           <p className="px-2"><strong>{username}</strong> postou :</p>
            <div className='flex flex-row gap-1'>
            <p className="pl-3 pb-1 flex-1">{title}</p>
            (isTitleExpand ? (
                <div className="bg-white w-8 h-8 relative rounded-full">
            <ChevronDown size={25} color="black" className='absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[46%]'/>
            </div>
            ) : (
                <div className="bg-white w-8 h-8 relative rounded-full">
            <ChevronUp size={25} color="black" className='absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[46%]'/>
            </div>
            ))
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
