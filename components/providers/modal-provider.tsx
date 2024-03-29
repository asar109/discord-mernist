"use client";
import React, { useEffect, useState } from "react";
import { CreateServerModel } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { UpdateServerModal } from "@/components/modals/update-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModel } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { UpdateChannelModal } from "@/components/modals/update-channel-modal";
import { SendFileUrl } from "@/components/modals/send-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";

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
      <DeleteServerModal/>
      <CreateChannelModel/>
      <UpdateChannelModal/>
      <DeleteChannelModal/>
      <InviteModal />
      <MembersModal />
      <SendFileUrl/>
      <DeleteMessageModal/>
    </>
  );
}

export default ModalProvider;
