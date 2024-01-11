"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import axios from "axios";

export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isModalOpen = isOpen && type === "leaveServer";

  const router = useRouter();

  const { server } = data;

  const leaveHandler = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push('/')
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
            Invite friends
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-sm">
            <p>
              Are you sure you want to leave{" "}
              <span className="text-indigo-500  font-bold">{server?.name}</span>{" "}
              ?
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
            onClick={() => leaveHandler()}
          >
            Leave
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
