import React from "react";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/currentProfile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import ChatHeader from "@/components/chat/chat-header";

const Page = async ({
  params,
}: {
  params: {
    channelId: string;
    id: string;
  };
}) => {
  const { channelId, id: serverID } = params;

  if (!channelId || !serverID) return redirect("/");

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
      serverId: serverID,
      profileId: profile.id,
    },
  });

  if (!member) return redirect("/");



  return (
    <div className="flex flex-col  bg-white dark:bg-[#313338]">
      <ChatHeader serverId={serverID} type="channel" name={channel.name}   />
    </div>
  );
};

export default Page;
