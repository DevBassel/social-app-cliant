import { createContext, ReactNode } from "react";
import { IUser } from "../types/user.interface";
import useProfile from "../hooks/common/useProfile";

export const UserContext = createContext<{
  profile: IUser;
} | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
  const { profile } = useProfile();

  return (
    <UserContext.Provider value={{ profile }}>{children}</UserContext.Provider>
  );
}
