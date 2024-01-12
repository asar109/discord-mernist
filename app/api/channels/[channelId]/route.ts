import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { channelId: string };
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

    const channel = await db.channel.deleteMany({
      where: {
        id: params.channelId,
        name: {
          not: "general",
        },
      },
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.log(`DELETE_CHANNEL_MODAL`, error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
