export interface IChateItem {
  id: number;
  senderId: number;
  recevierId: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    picture: string | null;
  };
}

export interface IChatMsg {
  id: number;
  content: string;
  chatId: number;
  senderId: number;
  mediaId: number | null;
  sentAt: string;
  updateAt: string;
  media: {
    id: number;
    cloudId: string;
    url: string;
    format: string;
    width: number;
    height: number;
  };
}
export interface IChatUser {
  id: number;
  name: string;
  picture: string;
}

export interface IMsgPayload {
  chatId: number;
  content: string;
}
