import React from "react";
import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";

interface Props {
  serverId: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  name: string;
}

function ChatHeader({ serverId, type, imageUrl, name }: Props) {
  return (
    <div className="bg-white dark:bg-[#2b2d31]  px-2 flex items-center dark:border-neutral-800  font-semibold text-md h-12 border-b ">
        <MobileToggle serverId={serverId} />
        {
            type === 'channel' && (<Hash className="ml-2 w-5 h-5 text-zinc-400 dark:text-zinc-500 " />)
        }
        <p className="ml-[2px] ">
            {name}
        </p>
    </div>
  );
}

export default ChatHeader;
