import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Heart } from "lucide-react";
import axios from "axios";
import { serverUrl } from "@/lib/utils";
import getToken from "@/lib/get-token";
import { toast } from "sonner";

export interface PostProps {
  username: string;
  title?: string;
  likesCount: number;
  imgUrl?: string;
  id: string;
}
export function Post({ username, title, likesCount, imgUrl, id }: PostProps) {
  const titleLimitSize = 30;
  const [titleSizeClass, setTitleSizeClass] = useState("");
  const [isTitleExpand, setIsTitleExpand] = useState(false);
  const [isTitleLarge, setIsTitleLarge] = useState(false);

  function expandTitle() {
    setIsTitleExpand(!isTitleExpand);
  }
  useEffect(() => {
    if (!title) return;

    if (isTitleLarge && !isTitleExpand) {
      if (imgUrl) {
        setTitleSizeClass(" h-10 ");
      } else {
        setTitleSizeClass(" h-24 ");
      }
    } else {
      setTitleSizeClass("");
    }
    if (title.length > titleLimitSize) {
      setIsTitleLarge(true);
    }
  });

  return (
    <div className="flex flex-col bg-black rounded-3xl pt-2 overflow-hidden">
      <div className="flex flex-col gap-1">
        {/*username*/}

        <div className="title-and-name px-1">
          <p className="px-2">
            <strong>{username}</strong> postou :
          </p>
          {/*title*/}
          {title && (
            <div className="flex flex-row gap-1 overflow-hidden">
              <p className={titleSizeClass + "pl-3 pb-1 flex-1"}>{title}</p>
              {
                //se titulo for maior que 20 caracteres
                isTitleLarge ? (
                  //se titulo tiver expandido? renderizar icone
                  isTitleExpand ? (
                    <>
                      <div
                        onClick={expandTitle}
                        className="bg-white w-8 h-8 relative rounded-full hover:w-9 hover:h-9 hover:cursor-pointer duration-100 active:bg-violet-700"
                      >
                        <ChevronDown
                          size={25}
                          color="black"
                          className="absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[46%]"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={expandTitle}
                        className="bg-white w-8 h-8 relative rounded-full hover:w-9 hover:h-9 hover:cursor-pointer duration-100 active:bg-violet-700"
                      >
                        <ChevronUp
                          size={25}
                          color="black"
                          className="absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[46%]"
                        />
                      </div>
                    </>
                  )
                ) : null
              }
            </div>
          )}
        </div>

        <div className="ImageAndLike relative overflow-hidden pt-2">
          {imgUrl && (
            <Image
              className="select-none w-full rounded-3xl object-cover max-h-96"
              src={imgUrl}
              width={2000}
              height={1000}
              alt="PostPicture"
            />
          )}
          <div className="absolute bottom-0 right-0">
            {LikeButton(likesCount, id)}
          </div>
        </div>
      </div>
    </div>
  );
  //criar componente de vizualização de objetos post
}
function LikeButton(likesCount: number, id: string) {
  const [likes, setLikes] = useState(likesCount);
  const setLikesCount = () => {
    console.log("increment");
    setLikes(likesCount + 1);
  };
  return (
    <button
      type="submit"
      onClick={() => sendLike(id, setLikesCount)}
      className="flex flex-row items-center font-bold text-5xl gap-3 justify-end p-3 "
    >
      <p className="select-none drop-shadow-md">{likes}</p>

      <div className="size-16 bg-gradient-to-b from-violet-500 to-violet-700 border rounded-full flex justify-center items-center group hover:from-white hover:to-white duration-300 hover:cursor-pointer hover:text-black hover:border-3 hover:border-violet-800 active:size-[68px] active:duration-0 active:from-red-600 active:to-red-600">
        <Heart className="size-10  group-hover:size-11" />
      </div>
    </button>
  );
}

async function sendLike(id: string, setLikesCount: () => void) {
  const fetcher = await axios.post(
    serverUrl() + "/posts/" + id + "/like",
    {},
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
  if (fetcher.data.increment) {
    setLikesCount();
  }
  console.log(fetcher.data);
  toast.message(fetcher.data.message);
}
