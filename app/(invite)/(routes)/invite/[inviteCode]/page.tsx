import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

const Invite = async ({
  params,
}: {
  params: {
    inviteCode: string;
  };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const alreadyMember = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (alreadyMember) {
    return redirect(`/servers/${alreadyMember.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
          role : MemberRole.GUEST
        },
      },
    },
  });

  return redirect(`/servers/${server.id}`);
};

export default Invite;
