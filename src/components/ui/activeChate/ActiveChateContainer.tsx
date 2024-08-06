import { Button, Container, Icon, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IChateItem, IChatMsg } from "../../../types/chatItem.interface";
import Msg from "../Msg";
import { findChat, findMsgs, SendMsg } from "../../../api/chat-calls";
import useActiveChate from "../../../hooks/common/useActiveChate";
import ActiveChatHeader from "./ActiveChatHeader";
import ChatForm from "./ChatForm";
import useSocket from "../../../hooks/common/useSocket";
import { ChatEvents } from "../../../types/socket/chat-events.enum";
import useUserData from "../../../hooks/common/useUserData";
import { BiUpArrow } from "react-icons/bi";

export default function ActiveChateContainer() {
  const { activeChate, setChatUser, chatUserData } = useActiveChate();
  const me = useUserData();
  const [localMsgs, setLocalMsgs] = useState<IChatMsg[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocket();

  useEffect(() => {
    socket.on(ChatEvents.SEND_MSG, (rep) => {
      console.log({ rep });
      setLocalMsgs((p) => [rep.data, ...p]);
    });

    return () => {
      socket.off(ChatEvents.SEND_MSG);
    };
  }, [socket]);

  const { mutate: sendMsg, isPending } = useMutation({
    mutationFn: SendMsg,
    onSuccess: (res) => {
      socket.emit(ChatEvents.SEND_MSG, {
        data: res,
        from: { id: me?.id, avatar: me?.picture, name: me?.name },
        toId: chatUserData?.id,
      });
      setLocalMsgs((p) => [res, ...p]);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });

  const { data: chat } = useQuery<IChateItem>({
    queryKey: ["active-chate", activeChate],
    queryFn: async () => {
      if (activeChate) {
        const chat = await findChat(+activeChate);
        setChatUser?.(chat.user);

        return chat;
      }
    },
    enabled: !!activeChate,
  });

  const { data: msgs } = useQuery<{ data: IChatMsg[] }>({
    queryKey: ["active-chate-msgs", activeChate],
    queryFn: async () => {
      if (activeChate) return findMsgs(+activeChate);
    },
    enabled: !!activeChate,
  });

  return (
    !!activeChate && (
      <Container
        maxWidth={"5xl"}
        className="!p-1   !w-10   !sm:p-2   grow h-full flex flex-col "
      >
        {chat && (
          <ActiveChatHeader
            picture={chat.user.picture!}
            name={chat.user.name}
          />
        )}

        {/* msgs container */}

        <VStack className="bg-teal-600/10 md:p-2 h-[calc(100vh_-_150px)] pb-24 !flex-col-reverse overflow-scroll sm:h-full border-t border-teal-600 mt-4 rounded-lg">
          {isPending && (
            <div className="sender msg flex items-center gap-6">
              sending <Spinner />
            </div>
          )}
          <div ref={bottomRef} />
          {localMsgs &&
            localMsgs.map((item: IChatMsg) => (
              <Msg key={`LOCALE____${item.id}`} item={item} />
            ))}
          {msgs?.data &&
            msgs.data.map((item) => (
              <Msg key={`REMOTE___${item.id}`} item={item} />
            ))}
          <Button className="p-2">
            <Icon as={BiUpArrow} />
          </Button>
        </VStack>
        <ChatForm sendMsg={sendMsg} />
      </Container>
    )
  );
}
