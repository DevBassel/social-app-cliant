export interface IUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  bio: string;
  mediaId: number | null;
  role: string;
  provider: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}
