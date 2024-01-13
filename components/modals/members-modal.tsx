"use client";
import AvatarComponent from "@/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const MembersModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
  };

  const isModalOpen = isOpen && type === "members";

  const { server } = data as { server: ServerWithMembersWithProfiles };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setSelectedId(memberId);
      const query = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const res = await axios.patch(query, {
        role,
      });

      router.refresh();

      onOpen("members", { server: res.data });
    } catch (error) {
      console.log("MembersModal -> error", error);
    } finally {
      setSelectedId(null);
    }
  };

  const onKickHandler = async (memberId: string) => {
    try {
      setSelectedId(memberId);
      const query = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const res = await axios.delete(query);

      router.refresh();

      onOpen("members", { server: res.data });
    } catch (error) {
      console.log("MembersModal -> error", error);
    } finally {
      setSelectedId(null);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  p-5 text-black overflow-hidden">
        <DialogHeader className="text-center">
          <DialogTitle className=" font-bold tracking-wide capitalize px-6 text-2xl text-center">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center  text-zinc-500 text-base font-semibold ">
            {server?.members.length > 1 ? (
              <>{server?.members.length} Members</>
            ) : (
              <>{server?.members.length} Member</>
            )}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] mt-8 ">
          {server?.members.map((member) => (
            <div key={member.id} className="flex items-center mb-3  gap-x-2">
              <AvatarComponent src={member.profile.imageUrl} />
              <div className="flex items-start flex-col ">
                <div className="flex items-center text-lg font-semibold  gap-x-1">
                  {member?.profile?.name}{" "}
                  {
                    roleIconMap[
                      `${member.role as "GUEST" | "MODERATOR" | "ADMIN"}`
                    ]
                  }
                </div>
                <div className="text-sm text-zinc-500 ">
                  {member?.profile?.email}
                </div>
              </div>
              <div className="ml-auto">
                {selectedId !== member.id &&
                member.role !== MemberRole.ADMIN ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreVertical className="h-4 w-4 hover:cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="right"
                        className="w-32 md:w-42"
                      >
                        <DropdownMenuGroup>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <ShieldQuestion className="mr-1" /> Role
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="ml-1">
                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChange(member.id, "GUEST")
                                  }
                                >
                                  <Shield className="mr-1" /> Guest{" "}
                                  {member.role === "GUEST" && (
                                    <Check className="ml-auto" />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChange(member.id, "MODERATOR")
                                  }
                                >
                                  <ShieldCheck className="mr-1" /> Moderator{" "}
                                  {member.role === "MODERATOR" && (
                                    <Check className="ml-auto" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKickHandler(member.id)}
                        >
                          <Gavel className="h-4 w-4 mr-1" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
              {selectedId === member.id ? (
                <Loader2 className="animate-spin ml-auto text-zinc-500 " />
              ) : null}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
