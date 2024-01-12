import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { channelId: string; serverId: string };
  }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.channelId) {
      return new NextResponse("Id missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              not: MemberRole.GUEST,
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(`DELETE_CHANNEL_MODAL`, error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
