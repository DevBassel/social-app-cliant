import { io, Socket } from "socket.io-client";
import { APIURL } from "./API.url";
import { getToken } from "./getToken";

export function SocketConnect(): Socket {
  return io(APIURL, {
    extraHeaders: {
      authorization: `Bearer ${getToken()}`,
    },
  });
}
