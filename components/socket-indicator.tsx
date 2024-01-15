"use client";
import React from "react";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="bg-yellow-600 text-sm  text-white border-0"
      >
        Offline
      </Badge>
    );
  }

  if (isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="bg-emerald-600 text-sm  text-white border-0"
      >
        online
      </Badge>
    );
  }
};

export default SocketIndicator;
