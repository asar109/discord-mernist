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

  try {
    const serverExist = await db.server.findUnique({
      where: {
        inviteCode: params.inviteCode,
      },
    });

    if (!serverExist) {
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
            role: MemberRole.GUEST,
          },
        },
      },
    });

    if (server) {
      return redirect(`/servers/${server.id}`);
    }

    return null;
  } catch (error) {
    console.error("Error processing invite:", error);
    return redirect("/");
  }
};

export default Invite;
