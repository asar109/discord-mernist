"use client";
import { Plus } from "lucide-react";
import React from "react";
import ActionTooltip from "../action-tooltip";

import { useModal } from "@/hooks/use-modal-store";
const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
      <ActionTooltip align="center" side="right" message="Add a server">
 
        <button
          onClick={() => onOpen("createServer")}
          className="group  flex item-center"
        >
          <div className="bg-[#e3e5e8] w-[48px] h-[48px] dark:bg-neutral-700 p-3 rounded-[24px] group-hover:rounded-[12px] group-hover:bg-emerald-500 transition-all ">
            <Plus
              size={24}
              className="group-hover:text-white transition text-emerald-500 "
            />
          </div>
        </button>
  
      </ActionTooltip>
  );
};

export default NavigationAction;
