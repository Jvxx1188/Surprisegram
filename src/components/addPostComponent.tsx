import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger, DialogClose
} from "@/components/ui/dialog"
import { FormMessage, FormField, Form, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import axios from "axios"
import getToken from "@/lib/get-token"
import { blob } from "stream/consumers"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { serverUrl } from "@/lib/utils"
export function AddPostComponent() {

  const [submitting, setSubmitting] = useState(false)

  function changeSubmit(value: boolean) {
    setSubmitting(value)
  }
  const form = useForm({
  })

  return <Dialog >
    <DialogTrigger className="bg-violet-950 rounded-3xl font-bold py-2 px-2 flex flex-row gap-2 hover:bg-lime-700 hover:cursor-pointer select-none active:bg-black">
      <p>Add post</p>
      <PlusCircle />
    </DialogTrigger>

    <DialogContent className="rounded-none  overflow-hidden flex p-0 bg-violet-950 max-h-full md:h-auto border-0 w-full md:rounded-3xl">
      <div className='container overflow-y-scroll overflow-x-hidden p-10 space-y-4'>
        <DialogHeader className="gap-4">
          <DialogTitle className="text-left font-bold text-3xl mb-5">Adicionar Post</DialogTitle>
        </DialogHeader>

        {/*/////////////////////*/}

        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit((e) => submitPost(e, changeSubmit))}>
            <section className="gap-4 flex flex-col md:flex-row">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea placeholder="adicione um título ou comentário" {...field} className='h-24 max-h-40 placeholder:text-gray-400 duration-500 rounded-[10px] md:h-24 focus:p-2 focus:bg-black focus:bg-opacity-30 focus:font-semibold' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...field } }) => {
                  return (

                    <FormItem className="flex flex-col text-center justify-center">
                      <FormLabel htmlFor="post-image-file" className="size-24 text-center flex items-center mx-auto  bg-violet-500 p-2 rounded-[10px] duration-500 focus:p-2 active:bg-black active:duration-0 hover:size-28 hover:cursor-pointer">Adicionar Imagem</FormLabel>

                      <FormControl>
                        <Input type='file' id='post-image-file' className="sr-only" placeholder="image" accept="image/*" {...field}
                          value={value?.fileName}
                          onChange={(e) => {
                            if (e.target.files) {
                              onChange(e.target.files[0])
                              console.log(e.target.files[0],)
                            }
                          }}
                        />
                      </FormControl>

                      {
                        value?.name && <p className='text-green-500 font-bold md:w-56 '>Imagem Adicionada! <span className="text-violet-400">{value.name}</span></p>
                      }
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </section>
            <FormField
              control={form.control}
              name="isFriendly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormControl>
                    <Input type='checkbox' className="size-8" {...field} />
                  </FormControl>
                  <FormLabel htmlFor="post-image-file" className="font-medium leading-4">Você considera este conteúdo amigável para crianças e familiares? <span className="text-violet-400">Marque a caixinha</span></FormLabel>

                  <FormMessage />
                </FormItem>
              )}
            />

            {
              !submitting ? (
                <DialogClose>
                  <button className="p-3 mx-auto max-w-40 bg-violet-700 font-bold shadow-xl   rounded-xl">Enviar Post</button>
                </DialogClose>
              ) : (
                <h1 className="text-center font-bold">O post ainda está carregando!</h1>
              )
            }

          </form>
        </Form>
        <DialogDescription className="text-red-500 hidden">
          conteúdos especificados como amigável contendo Explicidade serão REMOVIDOS
        </DialogDescription>

      </div>
    </DialogContent>
  </Dialog>
}

async function submitPost(data: any, setSubmitting: (value: boolean) => void) {
  console.log(setSubmitting)

  setSubmitting(true)
  const { image, title, isFriendly } = data;

  // (!isFriendly) {isFriendly = false}

  if (!title && !image) {
    setSubmitting(false)
    return toast.message('adicione ao menos um comentário ou uma imagem!')
  }
  console.log(data)
  toast.message('Enviando post (O upload de imagem pode demorar)')
  const postFormToSend = new FormData()
  //vamos verificar que se nao existir a imagem, eu quero enviar um fylestream vazia 

  postFormToSend.append('title', (title ? title : ''))
  postFormToSend.append('isFriendly', isFriendly)

  if (!image) {
    //criar uma fylestream vazia
    const voidFile = new File([''], 'img')
    postFormToSend.append('img', voidFile)
    //dar append no meu form
  } else {
    postFormToSend.append('img', image)
  }

  await axios.post(serverUrl() + '/posts/add', postFormToSend, {
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  }).then((res) => res.data).then((data) => {
    toast.message(data.message + ' (aguarde ou reincie a página)')
    setSubmitting(false)
  }).catch((err) => {
    toast.error('ocorreu um erro ao enviar o post')
    console.log(err)
    setSubmitting(false)
  })
  setSubmitting(false)
}
