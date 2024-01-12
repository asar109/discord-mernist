"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import axios from "axios";

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isModalOpen = isOpen && type === "deleteChannel";

  const router = useRouter();

  const { server, channel } = data;

  useEffect(() => {}, [isLoading]);

  const deleteHandler = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/channels/${channel?.id}/${server?.id}`);
      onClose();
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  p-5 text-black overflow-hidden">
        <DialogHeader className="text-center">
          <DialogTitle className="mb-8 font-bold tracking-wide capitalize px-6 text-2xl text-center">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-sm flex justify-center items-center flex-col">
            <p>Are you sure you want to do it? </p>
            <p>
              <span className="text-indigo-500  font-bold">
                {channel?.name}
              </span>{" "}
              channel will be deleted permanently
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center mt-4 gap-8 ">
          <Button
            className="w-full"
            variant={"primary"}
            disabled={isLoading}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={isLoading}
            variant="destructive"
            onClick={() => deleteHandler()}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
