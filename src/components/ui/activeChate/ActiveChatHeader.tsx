import { Avatar, AvatarBadge, Box, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatOpts from "./ChatOpts";
import useSocket from "../../../hooks/common/useSocket";
import { ChatEvents } from "../../../types/socket/chat-events.enum";
import useActiveChate from "../../../hooks/common/useActiveChate";

export default function ActiveChatHeader({
  picture,
  name,
}: {
  picture: string;
  name: string;
}) {
  const { socket } = useSocket();
  const [typing, setTyping] = useState(false);
  const { chatUserData } = useActiveChate();

  useEffect(() => {
    socket.on(ChatEvents.START_TYPING, (data) => {
      console.log(data);
      if (data.userId === chatUserData?.id) setTyping(true);
    });
    socket.on(ChatEvents.STOP_TYPING, (data) => {
      if (data.userId === chatUserData?.id) setTyping(false);
    });

    return () => {
      socket.off(ChatEvents.START_TYPING);
      socket.off(ChatEvents.STOP_TYPING);
    };
  }, [chatUserData?.id, socket]);

  return (
    <HStack justifyContent={"space-between"}>
      <Box display={"flex"} alignItems={"center"}>
        <Avatar src={picture || ""}>
          <AvatarBadge
            className="border !border-gray-500 !bg-gray-400"
            boxSize="15px"
          />
        </Avatar>
        <Box ml={3}>
          <Text>{name}</Text>
          <p className="text-teal-600 text-sm">{typing && "typing..."}</p>
        </Box>
      </Box>
      <ChatOpts />
    </HStack>
  );
}
