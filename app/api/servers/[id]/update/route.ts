import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const updatedServer = await db.server.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    console.log("SERVER_UPDATE ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
