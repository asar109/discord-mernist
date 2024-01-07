"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { MemberRole } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: string;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role ===  MemberRole.MODERATOR;

  const {  onOpen ,data  } = useModal();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-bold tracking-wider  px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-[1.2px] hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0">
        <div className="w-56 text-xs font-medium text-black dark:text-neutral-200 transition  ">
          {isModerator && (
            <DropdownMenuItem onClick={()=>onOpen('invite' , {server})} className="px-3 py-2 text-sm cursor-pointer text-indigo-600 dark:text-indigo-400">
              Invite People
              <UserPlus className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem onClick={()=>onOpen('serverSetting' , {server})} className="px-3 py-2 text-sm cursor-pointer">
              Server settings
              <Settings className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem onClick={()=>onOpen('members' , {server})} className="px-3 py-2 text-sm cursor-pointer">
              Manage members
              <Users className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
              Create channel
              <PlusCircle className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-400 ">
              Delete Server
              <Trash className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer ">
              Leave channel
              <LogOut className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
          )}

        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
