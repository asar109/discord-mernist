import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.id,
      members  : {
        some  : {
            profileId : profile.id
        }
      }
    },
  });


  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 flex-col fixed z-20 ">
        <ServerSidebar serverId={params.id}/>
      </div>
      <main className="md:pl-60">{children}</main>
    </div>
  );
};

export default layout;
