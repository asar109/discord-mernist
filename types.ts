import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    members: ({
        id : string,
        role : string,
        profileId : string    
        serverId : string,
        createdAt : Date,
        updatedAt : Date,
        profile : Profile
    })[];
  };