"use client";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { ServerWithMembersWithProfiles } from "@/types";
import { useState } from "react";

import axios from "axios";

export const InviteModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onOpen } = useModal();

  const isModalOpen = isOpen && type === "invite";

  const origin = useOrigin();

  const { server } = data;

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const copyHandler = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const newLink = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}`);

      onOpen("invite", { server: res.data });

      setIsLoading(false);
    } catch (error) {
      console.log("SERVER LINK:ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  p-5 text-black overflow-hidden">
        <DialogHeader className="text-center">
          <DialogTitle className="mb-8 font-bold tracking-wide capitalize px-6 text-2xl text-center">
            Invite friends
          </DialogTitle>
          <DialogDescription className="text-left">
            <p className="text-sm font-semibold text-zinc-800">
              Server invite link
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <Input
            value={inviteUrl}
            disabled={isLoading}
            className="w-full px-4 text-sm font-normal text-gray-800  bg-gray-200  transition border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-0"
          />
          <Button disabled={isLoading} onClick={copyHandler} size={"icon"}>
            {copied ? (
              <Check className="w-4 h-4" color="black" />
            ) : (
              <Copy className="w-4 h-4" color="black" />
            )}
          </Button>
        </div>
        <div className="flex mt-4  px-2 items-center">
          <Button
            disabled={isLoading}
            onClick={newLink}
            className="text-black"
            variant={"link"}
          >
            Generate new a link <RefreshCcw className="w-4 ml-1 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
