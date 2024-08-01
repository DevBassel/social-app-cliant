import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgetPassModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const schema = z.object({
    email: z.string().email(),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function submit(data: unknown) {
    console.log(data);
    reset();
    onClose();
  }
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Button
        variant={"link"}
        className="!text-teal-600 !text-sm"
        onClick={onOpen}
      >
        forget password?
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="!bg-mainDark !bg-opacity-90 border !w-11/12 border-teal-600">
          <form onSubmit={handleSubmit(submit)}>
            <ModalHeader className="text-teal-600 !text-2xl !font-black">
              Reset Your Password
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Enter Your Email:</FormLabel>
                <Input {...register("email")} placeholder="email" />
                <FormErrorMessage>
                  {errors.email && errors.email.message?.toString()}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                onClick={() => {
                  handleSubmit(submit);
                }}
                className="!bg-teal-600"
                mr={3}
              >
                Send
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
