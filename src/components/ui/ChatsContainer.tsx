import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Icon,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

import { IChateItem } from "../../types/chatItem.interface";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useState } from "react";
import useActiveChate from "../../hooks/common/useActiveChate";

function ChatsContainer({
  chats,
}: {
  chats: { data: IChateItem[]; pages: number };
}) {
  const { activeChate, setActive } = useActiveChate();
  const [openChats, setOpenChats] = useState(!activeChate);

  return (
    chats?.data && (
      <Box
        className={` relative `}
        width={openChats ? "80px" : 0}
        transition={"ease-out"}
        transitionDuration={"0.3s"}
      >
        <VStack
          padding={openChats ? 1 : 0}
          skewX={3}
          transition={"ease-out"}
          transitionDuration={"0.3s"}
          className={`bg-teal-600/20  h-full p-1 ${
            openChats ? "skew-y-0" : "skew-y-12"
          } overflow-hidden  relative${!openChats ? "skew-x-12" : "skew-x-0"}`}
        >
          <div className=" gap-4 overflow-scroll px-6">
            {chats &&
              chats.data.map((item) => (
                <Tooltip key={item.id} label={item.user.name}>
                  <Box
                    onClick={() => setActive?.(item.id)}
                    className="flex flex-col items-center  cursor-pointer justify-center p-2"
                  >
                    <Avatar src={item.user.picture!}>
                      <AvatarBadge
                        className="border !border-gray-500 !bg-gray-700"
                        bg="gray"
                        boxSize="19px"
                      />
                    </Avatar>
                    <Text mt={2} className="w-20 px-3 text-center truncate ">
                      {item.user.name}
                    </Text>
                  </Box>
                </Tooltip>
              ))}
          </div>
        </VStack>
        <Tooltip label="chats">
          <Button
            position={"absolute"}
            p={0}
            w={1}
            onClick={() => setOpenChats((p) => !p)}
            className="-right-5 top-1/2 z-20 -translate-y-1/2 "
          >
            <Icon as={openChats ? FcPrevious : FcNext} />
          </Button>
        </Tooltip>
      </Box>
    )
  );
}

export default ChatsContainer;
