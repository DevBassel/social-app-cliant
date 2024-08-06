import { Avatar, Box, Divider } from "@chakra-ui/react";
import { IChatMsg, IChatUser } from "../../types/chatItem.interface";
import { useContext } from "react";
import { ActiveChateContext } from "../../context/activeChateContext";
import useUserData from "../../hooks/common/useUserData";
import moment from "moment";

export default function Msg({ item }: { item: IChatMsg }) {
  const chatUserData = useContext(ActiveChateContext)?.chatUserData;
  const me = useUserData();
  const currentUser = (
    me?.id === item.senderId ? me : chatUserData
  ) as IChatUser;

  moment.updateLocale("en", {
    relativeTime: {
      past: "%s ago",
      ss: "%d s",
      mm: "%d min",
      hh: "%d h",
      dd: "%d d",
      MM: "%d mo",
      yy: "%d y",
    },
  });
  return (
    chatUserData &&
    me && (
      <Box
        className={`w-full flex  ${
          me.id !== item.senderId ? "flex-row-reverse " : ""
        }`}
      >
        <Avatar boxSize={5} src={currentUser.picture} />

        <Box
          className={`msg ${me.id === item.senderId ? "sender" : "recevier"}`}
        >
          <p className="text-sm font-bold tracking-widest  text-white/50">
            {item.senderId === me.id ? me.name : chatUserData.name}
          </p>
          <Divider />
          <pre className="text-wrap">{item.content}</pre>
          <div className="mx-auto w-fit">
            {item.media && <MsgMedia media={item.media} />}
          </div>
          <p className="text-white/50 text-[10px] text-right">
            {moment(item.sentAt).fromNow()}
          </p>
        </Box>
      </Box>
    )
  );
}

function MsgMedia({ media }: { media: IChatMsg["media"] }) {
  return (
    <>
      {["jpg", "png", "gif", "jpeg"].includes(media.format) && (
        <img src={media.url} className="h-40 " />
      )}

      {["mp4"].includes(media.format) && (
        <video controls muted src={media.url} className="h-40  w-72" />
      )}
    </>
  );
}
