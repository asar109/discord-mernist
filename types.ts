import { Member, Profile, Server } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIoServer } from "socket.io";
import { NextApiResponse } from "next";
import { Message } from "@prisma/client";
export type ServerWithMembersWithProfiles = Server & {
  members: {
    id: string;
    role: string;
    profileId: string;
    serverId: string;
    createdAt: Date;
    updatedAt: Date;
    profile: Profile;
  }[];
};

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer;
    };
  };
};

export type MessageWithMemberAndProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};
