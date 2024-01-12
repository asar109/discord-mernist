"use client";
import { ChannelType, MemberRole, Server } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  channelType?: ChannelType;
  sectionType?: "channels" | "members";
  server?: Server;
  role?: MemberRole;
}

const ServerSection = ({
  label,
  channelType,
  sectionType,
  server,
  role,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-zinc-500 uppercase dark:text-zinc-400 font-semibold text-xs">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip message="Create Channel" align="center" >
          <button
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200  transition"
            onClick={() => onOpen("createChannel" , {channelType})}
          >
            <Plus className="w-4 h-4  " />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip message="Create Channel" align="center" >
          <button
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200  transition"
            onClick={() => onOpen("members", {server})}
          >
            <Settings className="w-4 h-4  " />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
