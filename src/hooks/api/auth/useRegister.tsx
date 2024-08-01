import { useMutation } from "@tanstack/react-query";
import { registerNewUser } from "../../../api/auth-calls";
import { useToast } from "@chakra-ui/react";
import useTostsErr from "../../common/useTostsErr";

export default function useRegister() {
  const toast = useToast();
  const tostErr = useTostsErr();

  const { mutate: RegisterMutate } = useMutation({
    mutationFn: registerNewUser,

    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "success",
        description: data.msg,
        isClosable: true,
        status: "success",
      });
    },

    onError: (err) => tostErr(err),
  });
  return { RegisterMutate };
}
