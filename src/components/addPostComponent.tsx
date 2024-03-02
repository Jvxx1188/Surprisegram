import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,DialogClose
  } from "@/components/ui/dialog"
import {FormMessage,FormField,Form,FormItem,FormLabel,FormControl} from '@/components/ui/form'
import {Textarea} from '@/components/ui/textarea'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
export function AddPostComponent(){
  const form = useForm()

  function handleRestart(bool : boolean) {
    if(bool){
      form.reset()
    }
  }
    return <Dialog onOpenChange={(bool) => handleRestart(bool)}>
        <DialogTrigger className="bg-violet-950 rounded-3xl font-bold py-2 px-2 flex flex-row gap-2 hover:bg-lime-700 hover:cursor-pointer select-none active:bg-black">
    <p>Add post</p>
    <PlusCircle/>
      </DialogTrigger>

      <DialogContent className="rounded-none  overflow-hidden flex p-0 bg-violet-950 max-h-full md:h-auto border-0 w-full md:rounded-3xl">   
      <div className='container overflow-y-scroll overflow-x-hidden p-10 space-y-4'>
      <DialogHeader className="gap-4">
      <DialogTitle className="text-left font-bold text-3xl mb-5">Adicionar Post</DialogTitle>
      </DialogHeader>

    {/*/////////////////////*/}

    <Form {...form}>
    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(submitPost)}>
    <section className="gap-4 flex flex-col md:flex-row">
    <FormField
    control={form.control}
    name="title"
    render={({field})=>(
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
    render={({field})=>{
      return (

      <FormItem className="flex flex-col text-center justify-center">
        <FormLabel htmlFor="post-image-file" className="size-24 text-center flex items-center mx-auto  bg-violet-500 p-2 rounded-[10px] duration-500 focus:p-2 active:bg-black active:duration-0 hover:size-28 hover:cursor-pointer">Adicionar Imagem</FormLabel>
        {
          field.value && <p className='text-green-500 font-bolder md:w-56 '>Imagem Adicionada! {field.value}</p>
        }
        
        <FormControl>
        <Input type='file' id='post-image-file' className="sr-only" placeholder="image" {...field}/>
        </FormControl>
        
        
          <FormMessage />
      </FormItem>
    )}}
    />
      </section>
      <FormField
    control={form.control}
    name="isFriendly"
    render={({field})=>(
      <FormItem className="flex flex-row items-center gap-3">
        <FormControl>
        <Input type='checkbox' className="size-8" {...field}/>
        </FormControl>
                <FormLabel htmlFor="post-image-file" className="font-medium leading-4">Você considera este conteúdo amigável para crianças e familiares? <span className="text-violet-400">Marque a caixinha</span></FormLabel>
        
          <FormMessage />
      </FormItem>
    )}
    />
    

    <button  className="p-3 mx-auto max-w-40 bg-violet-700 font-bold shadow-xl   rounded-xl">Enviar Post</button>
    </form>
    </Form>
    <DialogDescription className="text-red-500 ">
      conteúdos especificados como amigável contendo Explicidade serão REMOVIDOS e eu vou banir teu ip seu viado
      </DialogDescription>
    
      </div>
      </DialogContent>
  </Dialog>
}

function submitPost(data : any) {
  if(!data.title && !data.image){
    return toast.message('adicione ao menos um comentário ou uma imagem!')
  }
  toast.message('Enviando tlgd')
  const realData = {username : 'John Doe',...data}
console.log(realData)
}