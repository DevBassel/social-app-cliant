import {
  Avatar,
  Button,
  Divider,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { HaveCall } from "../../types/HaveCall.interface";
import { FcPhone } from "react-icons/fc";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useSocket from "../../hooks/common/useSocket";
import { CallEvents } from "../../types/socket/call-events.enum";
import useActiveChate from "../../hooks/common/useActiveChate";

function CallOffer({
  isopen,
  close,
  data,
}: {
  isopen: boolean;
  data: HaveCall;
  close(): void;
}) {
  console.log({ data });
  const { socket } = useSocket();
  const {} = useActiveChate();

  return (
    <>
      <Modal
        isOpen={isopen}
        onClose={() => close()}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent mx={2} className="!bg-white/5 backdrop-blur-3xl">
          <ModalCloseButton />
          <ModalHeader className="flex gap-4 items-center">
            <span className="text-teal-600">{data.from.name}</span>
            <Icon as={FcPhone} className="text-4xl" />
          </ModalHeader>
          <Divider />

          <ModalBody className=" flex flex-col items-center gap-5 relative">
            <motion.div
              className="border-0 border-emerald-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-32 h-32 rounded-full "
              initial={{
                borderWidth: 0,
              }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              animate={{
                borderWidth: 4,
              }}
            ></motion.div>
            <Avatar src={data.from.picture} boxSize={28} />
          </ModalBody>
          <Divider />

          <ModalFooter className="w-fit mx-auto flex gap-6">
            <Button bg={"green.700"} onClick={close}>
              <Link to="/chats/call">ACCEPT</Link>
            </Button>
            <Button bg={"red.900"} onClick={close}>
              CANCEL
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CallOffer;
