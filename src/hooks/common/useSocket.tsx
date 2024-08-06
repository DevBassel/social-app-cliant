import { useContext } from "react";
import { Isocket, WebSocketContext } from "../../context/WebSocketContext";

export default function useSocket() {
  const socket = useContext(WebSocketContext);
  return socket as Isocket;
}
