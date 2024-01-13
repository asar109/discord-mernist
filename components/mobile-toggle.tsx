
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import NavigationSidebar from "./navigation/navigation-sidebar";
import ServerSidebar from "./server/server-sidebar";

export const MobileToggle = ({
    serverId 
} : {
    serverId : string
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="md:hidden" >
        <Menu className="w-5 h-5 text-zinc-400 dark:text-zinc-500 " />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0 flex gap-0" >
       <div className="w-[72px]">
        <NavigationSidebar/>
       </div>
       <ServerSidebar serverId={serverId} />

      </SheetContent>
    </Sheet>
  );
};
