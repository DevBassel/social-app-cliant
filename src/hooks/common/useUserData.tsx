import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function useUserData() {
  const data = useContext(UserContext)?.profile;
  return data;
}
