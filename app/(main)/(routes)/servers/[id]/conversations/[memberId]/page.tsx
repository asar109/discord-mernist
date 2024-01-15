import ChatHeader from "@/components/chat/chat-header";
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



  if(!conversation){
    return redirect(`/servers/${params.id}`);
  }

  const {memberOne , memberTwo} = conversation

  const otherProfile = conversation.memberOneId !== currentMember.id ?  memberOne.profile : memberTwo.profile

  return (

    <>
    <ChatHeader 
    name={otherProfile.name}
    serverId={params.id}
    type="conversation"
    imageUrl={otherProfile.imageUrl}
    />
    </>
  );
};

export default Page;
