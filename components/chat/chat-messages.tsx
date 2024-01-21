"use client";
import { Member } from "@prisma/client";
import React, { Fragment, useRef, ElementRef } from "react";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { format } from "date-fns";
import { MessageWithMemberAndProfile } from "@/types";
import ChatItem from "./chat-item";
import { DATE_FORMAT } from "@/lib/date-format";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      paramKey,
      paramValue,
      apiUrl,
    });

  useChatSocket({
    addKey,
    updateKey,
    queryKey,
  });

  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col overflow-y-scroll  ">
      {!hasNextPage && <div className="flex-1 " />}
      {!hasNextPage && <ChatWelcome name={name} type={type} />}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="text-zinc-500 dark:text-zinc-400 mt-4 text-xs font-semibold mb-2"
        >
          {isFetchingNextPage ? (
            <Loader2 className="w-6 h-6 animate-spin " />
          ) : (
            "Load more"
          )}
        </button>
      )}
      <div className="flex flex-col-reverse">
        {data?.pages?.map((group, index) => (
          <Fragment key={index}>
            {group?.items.map((message: MessageWithMemberAndProfile) => (
              <ChatItem
                key={message.id}
                content={message.content}
                fileUrl={message.fileUrl}
                isUpdated={message.updatedAt !== message.createdAt}
                isDeleted={message.deleted}
                currentMember={member}
                member={message.member}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                id={message.id}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
