import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../../api/auth-calls";
import useTostsErr from "../../common/useTostsErr";
export default function useLogin() {
  const navigate = useNavigate();
  const tost = useTostsErr();

  const {
    mutate: LoginMutate,
    status,
    error,
  } = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data: { access_token: string }) => {
      localStorage.setItem("token", data?.access_token);
      console.log(data?.access_token);
      navigate("/");
    },
    onError: (err) => {
      tost(err);
    },
  });
  return { LoginMutate, status, error };
}
