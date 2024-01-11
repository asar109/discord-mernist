import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });


  return (
    <div className="w-full h-full  items-center space-y-4  py-3 flex flex-col text-primary  dark:bg-[#1E1F22]">
      <NavigationAction />

      <Separator className="h-[2px] w-10 mx-auto bg-zinc-300  dark:bg-zinc-700 " />

      <ScrollArea className="w-full flex-1">
        {servers &&
          servers.map((server) => (
            <div className="mb-4" key={server.id}>
              <NavigationItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
              />
            </div>
          ))}
      </ScrollArea>

      <div className="flex items-center gap-2 justify-center flex-col mt-auto">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[42px] w-[42px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
