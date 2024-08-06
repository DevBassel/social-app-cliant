import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../api/api.client";
import { getToken } from "../../utils/getToken";

export default function useProfile() {
  const token = getToken();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (token) {
        const res = await axiosClient.get("/users/me");
        localStorage.setItem("profile", JSON.stringify(res.data));
        return res.data;
      } else return null;
    },
    initialData:
      localStorage.getItem("profile") &&
      JSON.parse(localStorage.getItem("profile")!),
  });
  return { profile };
}
