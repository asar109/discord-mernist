import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ServerHeader from "./server-header";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
import { ServerChannel } from "./server-channels";
import { ServerMember } from "./server-members";

interface ServersidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServersidebarProps) => {
  const channelIconMap = {
    [ChannelType.TEXT]: <Hash className=" mr-2 w-4 h-4" />,
    [ChannelType.AUDIO]: <Mic className=" mr-2 w-4 h-4" />,
    [ChannelType.VIDEO]: <Video className=" mr-2 w-4 h-4" />,
  };

  const memberIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
      <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-indigo-500" />,
  };

  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );
  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="w-full flex-col text-primary dark:bg-[#2b2d31] bg-[#f2f3f5]  h-full">
      <ServerHeader server={server} role={role} />

      <ScrollArea   className="h-full rounded-md p-4">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  icon: channelIconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  icon: memberIconMap[member.role],
                  name: member.profile.name,
                  id: member.id,
                })),
              },
            ]}
          />
        </div>
        <Separator className="dark:bg-zinc-700 rounded-md bg-zinc-200 my-2" />

        {/*  Render text channels  */}
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Text Channels"
              server={server}
              channelType={ChannelType.TEXT}
              role={role}
              sectionType="channels"
            />

            {textChannels?.map((channel) => (
              <ServerChannel
                channel={channel}
                server={server}
                key={channel.id}
              />
            ))}
          </div>
        )}

        {/*  Render audio channels  */}

        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Voice Channels"
              server={server}
              channelType={ChannelType.AUDIO}
              role={role}
              sectionType="channels"
            />

            {audioChannels?.map((channel) => (
              <ServerChannel
                channel={channel}
                server={server}
                key={channel.id}
              />
            ))}
          </div>
        )}

        {/*  Render video channels  */}

        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Video Channels"
              server={server}
              channelType={ChannelType.VIDEO}
              role={role}
              sectionType="channels"
            />

            {videoChannels?.map((channel) => (
              <ServerChannel
                channel={channel}
                server={server}
                key={channel.id}
              />
            ))}
          </div>
        )}

        {/* Render members */}

        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              label="Members"
              server={server}
              role={role}
              sectionType="members"
            />
            {members?.map((member) => (
              <ServerMember key={member.id} member={member} server={server} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
