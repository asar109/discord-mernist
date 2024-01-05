"use client";
import React, { useEffect, useState } from "react";
import { CreateServerModel } from "../modals/create-server-modal";

function CreateServerProvider() {
  const [isMonted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMonted) {
    return null;
  }

  return <CreateServerModel />;
}

export default CreateServerProvider;
