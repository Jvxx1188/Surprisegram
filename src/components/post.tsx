import React, { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { ChevronDown ,ChevronUp ,Heart} from "lucide-react"

interface PostProps{
    username: string,
    title?: string,
    likesCount : number
    imgUrl? : string
}
export function Post({username,title,likesCount,imgUrl} : PostProps){
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
            if(imgUrl){
                setTitleSizeClass(' h-10 ')
            }else{
                setTitleSizeClass(' h-24 ')
            }
            
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
            {/*username*/}
           <p className="px-2"><strong>{username}</strong> postou :</p>
           {/*title*/}
           {title && (
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
           )}


        {
            imgUrl && <div className="">
                <Image className="select-none" src={imgUrl} width={1000} height={1000} alt="PostPicture"/>
            </div>
        }

{/*likes*/}
{LikeButton(likesCount)}
           </div>
            

            
           
        </div>
    )
    //criar componente de vizualização de objetos post
}
function LikeButton(likesCount : number){

    return <div className="flex flex-row items-center font-bold text-5xl gap-3 justify-end p-3 ">

        
        <p className="select-none" >{likesCount}</p>

<div className="size-16 bg-gradient-to-b from-violet-500 to-violet-700 border rounded-full flex justify-center items-center group hover:from-white hover:to-white duration-300 hover:cursor-pointer hover:text-black hover:border-3 hover:border-violet-800 active:size-[68px] active:duration-0 active:from-red-600 active:to-red-600">
<Heart className="size-10  group-hover:size-11"/>
    

</div>

    </div> 

}
