import { Server } from "@prisma/client";
import { create } from "zustand";

export type Modaltype = "createServer" | 'invite'| 'serverSetting' | 'members' | 'createChannel' | 'leaveServer' | 'deleteServer';

export type Datatype = {
  server? : Server
}

interface ModalStore {
  type: Modaltype | null;
  isOpen: boolean;
  onOpen: (type: Modaltype , data? : Datatype) => void;
  onClose: () => void;
  data : Datatype

}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data : {},
  isOpen: false,
  onOpen: (type , data ={}) => set({ type, isOpen: true , data }),
  onClose: () => set({ isOpen: false, type: null }),
}));

