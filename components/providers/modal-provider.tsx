"use client";
import React, { useEffect, useState } from "react";
import { CreateServerModel } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { UpdateServerModal } from "../modals/update-server-modal";
import { MembersModal } from "../modals/members-modal";

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
      <InviteModal />
      <MembersModal />
    </>
  );
}

export default ModalProvider;
