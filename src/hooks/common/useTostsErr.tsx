import { useToast } from "@chakra-ui/react";
import { isAxiosError } from "axios";

export default function useTostsErr() {
  const toast = useToast();
  function tostError(err: unknown) {
    if (isAxiosError(err)) {
      return toast({
        description: err.response?.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      return toast({
        description: "some wrongs",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }
  return tostError;
}
