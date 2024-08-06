import { createContext, ReactNode, useState } from "react";
import { IChatUser } from "../types/chatItem.interface";

interface IActiveChate {
  activeChate: number | null | string;
  setActive(id: number | null): void;
  setChatUser(data: IChatUser): void;
  chatUserData: IChatUser;
}

export const ActiveChateContext = createContext<IActiveChate | null>(null);

export default function ActiveChateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeChate, setActiveChate] = useState<number | null | string>(() => {
    const active = localStorage.getItem("active-chate");
    return active || null;
  });
  const [chatUserData, setChatData] = useState<IChatUser>({} as IChatUser);

  const setActive = (id: number | null) => {
    if (id === null) {
      localStorage.removeItem("active-chate");
      setActiveChate(null);
    } else {
      localStorage.setItem("active-chate", String(id));
      setActiveChate(id);
    }
  };

  const setChatUser = (data: IChatUser) => {
    setChatData(data);
  };

  return (
    <ActiveChateContext.Provider
      value={{ activeChate, setActive, setChatUser, chatUserData }}
    >
      {children}
    </ActiveChateContext.Provider>
  );
}
