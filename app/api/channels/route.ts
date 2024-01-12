import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server Id missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be general", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(`CREATE_CHANNEL_MODAL`, error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get("channelId");
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID Missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Channel name cannot be general ");
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const channelExist = await db.server.findFirst({
      where: {
        id: serverId,
        channels: {
          some: {
            id: channelId,
          },
        },
      },
    });

    if (!channelExist) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    const updatedServer = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
        channels: {
          some: {
            id: channelId,
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    console.log(`CREATE_CHANNEL_MODAL`, error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
