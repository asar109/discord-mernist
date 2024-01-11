"use client";
import React, { useEffect, useState } from "react";
import { CreateServerModel } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { UpdateServerModal } from "@/components/modals/update-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModel } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";

function ModalProvider() {
  const [isMonted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMonted) {
    return null;
  }

  return (
    <>
      <CreateServerModel />
      <UpdateServerModal />
      <LeaveServerModal/>
      <CreateChannelModel/>
      <InviteModal />
      <MembersModal />
    </>
  );
}

export default ModalProvider;
