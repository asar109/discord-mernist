import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
    memberId: string;
  };
}

const Page = async ({ params }: Props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect(`/servers/${params.id}`);
  }
  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.id}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherProfile =
    conversation.memberOneId !== currentMember.id
      ? memberOne.profile
      : memberTwo.profile;

  return (
    <div className=" flex flex-col h-screen bg-white dark:bg-[#313338]">
      <ChatHeader
        name={otherProfile.name}
        serverId={params.id}
        type="conversation"
        imageUrl={otherProfile.imageUrl}
      />
      <ChatMessages
        type="conversation"
        chatId={conversation.id}
        name={otherProfile.name}
        paramKey="conversationId"
        paramValue={conversation.id}
        apiUrl="/api/direct-messages"
        socketUrl="/api/socket/direct-messages"
        socketQuery={{ conversationId: conversation.id }}
        member={currentMember}
      />
      <ChatInput
        name={otherProfile.name}
        apiUrl="/api/socket/direct-messages"
        query={{ conversationId: conversation.id }}
        type="conversation"
      />
    </div>
  );
};

export default Page;
