import { Hash } from "lucide-react";
import AvatarComponent from "../avatar";
import { MobileToggle } from "../mobile-toggle";
import SocketIndicator from "../socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface Props {
  serverId: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  name: string;
}

function ChatHeader({ serverId, type, imageUrl, name }: Props) {
  return (
    <div className="bg-white dark:bg-[#2b2d31]  px-2 flex items-center dark:border-neutral-800  font-semibold text-md min-h-12 border-b ">
      <MobileToggle serverId={serverId} />
      {imageUrl && <AvatarComponent classNames="w-8 h-8 mr-1" src={imageUrl} />}

      {type === "channel" && (
        <Hash className="ml-2 w-5 h-5 text-zinc-400 dark:text-zinc-500 " />
      )}
      <p className="ml-[2px] ">{name}</p>

      <div className="ml-auto flex justify-center items-center ">
        {
          type === "conversation" && (
            <ChatVideoButton/>
          )
        }
        <SocketIndicator />
      </div>
    </div>
  );
}

export default ChatHeader;
