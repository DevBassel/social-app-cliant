import { Context, createContext, ReactNode, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SocketConnect } from "../utils/connectSocket";
import Peer from "peerjs";

export interface Isocket {
  socket: Socket;
  update?(): void;
  peer?: Peer | null;
  setPeer?(p: Peer | null): void;
}

const socket: Socket = SocketConnect();

export const WebSocketContext: Context<Isocket> = createContext<Isocket>({
  socket,
});

export default function WebSocketProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [updateConnect, setUpdateConnection] = useState(false);
  const [s, setS] = useState<Socket>(socket);
  const [peer, setP] = useState<Peer | null>();

  useEffect(() => {
    setS(SocketConnect());
  }, [updateConnect]);

  function update() {
    setUpdateConnection((p) => !p);
  }
  function setPeer(p: Peer | null) {
    setP(p);
  }

  return (
    <WebSocketContext.Provider value={{ socket: s, update, peer, setPeer }}>
      {children}
    </WebSocketContext.Provider>
  );
}
