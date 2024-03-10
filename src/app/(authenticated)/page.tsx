"use client";

import Link from "next/link";
import { Post } from "@/components/post";
import axios from "axios";
import { serverUrl } from "@/lib/utils";
import getToken from "@/lib/get-token";
import useSWR from "swr";
import { PostProps } from "../../components/post";
import { toast } from "sonner";
export default function Home() {
  const { data } = GetPosts<Array<PostProps>>();
  return (
    <main
      id="post-container"
      className="px-1 flex flex-col gap-3 max-w-2xl mx-auto"
    >
      {
        data ? (data?.map((post) => {
          return <Post
            imgUrl={post.imgUrl}
            username={post.username}
            title={post.title}
            likesCount={post.likesCount}
            id={post.id}
            key={post.id}
          />
        })) : (<h1>Carregando</h1>)
      }
    </main>
  );
}

function GetPosts<Data>() {
  //chamdada
  const fetcher = async (url: string) => {
    const response = await axios.get<Data>(url, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
    const data = await response.data;

    console.log(response);
    return data;
  };

  const { data, error } = useSWR<Data>(serverUrl() + "/get/posts", fetcher);
  if (error) {
    console.log(error);
    toast.error("Ocorreu um error ao carregar os posts")
  }
  return { data };
}
//funcionar
//validaçoes de error
