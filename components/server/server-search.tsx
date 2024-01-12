"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

function ServerSearch({ data }: ServerSearchProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const params = useParams();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);



  const onClickHandler = ({id , type} :  {id : string , type :  "channel" | "member"})=>{
    setOpen(false)

    if(type === "channel"){
    return   router.push(`/servers/${params?.id}/channels/${id}`)
  
    }
    if(type === "member"){
      return router.push(`/servers/${params?.id}/conversations/${id}`)
    }
    
  }


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-400 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto ">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </button>

      <div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search all channels and members" />
          <CommandEmpty>No result found</CommandEmpty>
          <ScrollArea className="h-72">
          {data?.map(({ data, type, label }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ name, id, icon }) => (
                  <>
                    <CommandItem className="hover:cursor-pointer" key={id}  onSelect={()=>onClickHandler({id , type})} >
                      <span>{icon}</span>
                      {name}
                    </CommandItem>
                  </>
                ))}
              </CommandGroup>
            );
          })}
          </ScrollArea>
        </CommandDialog>
      </div>
    </>
  );
}

export default ServerSearch;
