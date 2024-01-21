import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: {
    channelId: string;
    id: string;
  };
}) => {
  const { channelId, id: serverId } = params;

  if (!channelId || !serverId) return redirect("/");

  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  if (!channel) return redirect("/");

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!member) return redirect("/");

  return (
    <div className=" flex flex-col h-screen bg-white dark:bg-[#313338]">
      <ChatHeader serverId={serverId} type="channel" name={channel.name} />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/message"
            socketQuery={{ channelId: channel.id, serverId: channel.serverId }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name="channel"
            type="channel"
            apiUrl="/api/socket/message"
            query={{ channelId, serverId }}
          />
        </>
      )}

      {channel.type === ChannelType.AUDIO && (
        <MediaRoom audio={true} video={false} chatId={channel.id} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom audio={true} video={true} chatId={channel.id} />
      )}
    </div>
  );
};

export default Page;
