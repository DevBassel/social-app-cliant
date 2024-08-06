import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../../api/auth-calls";
import useTostsErr from "../../common/useTostsErr";
import useSocket from "../../common/useSocket";

export default function useLogin() {
  const navigate = useNavigate();
  const tost = useTostsErr();
  const { update } = useSocket();

  const {
    mutate: LoginMutate,
    status,
    error,
  } = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data: { access_token: string }) => {
      localStorage.setItem("token", data?.access_token);
      // console.log(data?.access_token);
      update!();
      navigate("/profile");
    },
    onError: (err) => {
      tost(err);
    },
  });
  return { LoginMutate, status, error };
}
