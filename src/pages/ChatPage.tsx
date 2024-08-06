import ChatsContainer from "../components/ui/ChatsContainer";
import IsAuth from "../utils/IsAuth";
import ActiveChateContainer from "../components/ui/activeChate/ActiveChateContainer";
import { IChateItem } from "../types/chatItem.interface";
import { useQuery } from "@tanstack/react-query";
import { myChats } from "../api/chat-calls";
import { Outlet } from "react-router-dom";

function ChatPageComp() {
  const { data } = useQuery<{ data: IChateItem[]; pages: number }>({
    queryKey: ["chats"],
    queryFn: myChats,
    refetchOnWindowFocus: "always",
  });
  const defaultData = { data: [], pages: 0 };
  return (
    <div className="grow h-full flex flex-row">
      <ChatsContainer chats={data ?? defaultData} />
      <ActiveChateContainer />
      <Outlet />
    </div>
  );
}
export const ChatPage = IsAuth(ChatPageComp);
