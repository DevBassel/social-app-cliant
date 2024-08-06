import { IMsgPayload } from "../types/chatItem.interface";
import { axiosClient } from "./api.client";

export async function SendMsg(data: IMsgPayload | FormData) {
  const res = await axiosClient.post("msgs", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function myChats() {
  const res = await axiosClient.get(`/chat`);
  return res.data;
}

export async function findChat(id: number) {
  const res = await axiosClient.get(`/chat/${id}`);
  return res.data;
}

export async function findMsgs(chatId: number) {
  const res = await axiosClient.get(`/msgs?chatId=${chatId}`);
  return res.data;
}
