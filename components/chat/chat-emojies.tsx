"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  onChange: (e: string) => void;
}

const ChatEmojies = ({ onChange }: Props) => {
  const { theme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Smile className="text-zinc-600 dark:text-zinc-200  hover:text-zinc-500 cursor-pointer " />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="shadow-none p-0 w-full border-0 mb-4 bg-transparent  md:mr-4 mr-1 "
      >
        <Picker
          theme={theme}
          autoFocus
          data={data}
          onEmojiSelect={(e: any) => onChange(e.native)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ChatEmojies;
