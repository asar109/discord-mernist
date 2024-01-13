import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const Server = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findFirst({
    where: {
      id: params.id,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initalChannel = server?.channels[0];

  if (initalChannel?.name !== "general") return redirect("/");

  return redirect(`/servers/${params.id}/channels/${initalChannel?.id}`);
};

export default Server;
