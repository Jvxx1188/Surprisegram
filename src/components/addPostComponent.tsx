import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,DialogClose
  } from "@/components/ui/dialog"

  

import { PlusCircle } from "lucide-react";
export function AddPostComponent(){
    return <Dialog>
        <DialogTrigger className="bg-violet-950 rounded-3xl font-bold py-2 px-2 flex flex-row gap-2 hover:bg-lime-700 hover:cursor-pointer select-none active:bg-black">
    <p>Add post</p>
    <PlusCircle/>
      </DialogTrigger>

      <DialogContent className="rounded-3xl bg-violet-950 border-0">   
      <DialogHeader className="gap-4">
      <DialogTitle className="text-left font-bold text-3xl">Adicionar Post</DialogTitle>
      <DialogDescription className="text-red-500 ">
       Atenção : conteúdos especificados como AMIGAVEL contendo Explicidade serão REMOVIDOS e eu vou te banir seu viado
      </DialogDescription>
    </DialogHeader>

  <form >
    <div>
      <input type="text" name="post-title" id="post-title" placeholder="" />
      <label htmlFor="post-title"></label>
    </div>
    <div>
      <input type="text" name="post-title" id="post-title" />
      <label htmlFor="post-title"></label>
    </div>
    <button>Enviar Post</button>
  </form>
  </DialogContent>
      </Dialog>


  

}