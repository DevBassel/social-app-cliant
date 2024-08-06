import {
  Avatar,
  Button,
  Divider,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useActiveChate from "../../../hooks/common/useActiveChate";
import { FcEndCall } from "react-icons/fc";
import { BiTransferAlt } from "react-icons/bi";
import useUserData from "../../../hooks/common/useUserData";
import { useNavigate } from "react-router-dom";

function CallContainer() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const { chatUserData } = useActiveChate();
  const me = useUserData();
  const navigate = useNavigate();

  return (
    chatUserData &&
    me && (
      <>
        <Modal
          size={"4xl"}
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent
            h={450}
            mx={2}
            className="!bg-white/5 backdrop-blur-3xl"
          >
            <ModalHeader className="flex gap-4 items-center">
              <Avatar src={chatUserData.picture} boxSize={7} />
              <p className="text-teal-600">{chatUserData.name}</p>
            </ModalHeader>
            <Divider />

            <ModalBody className="flex items-center justify-center gap-5">
              <Icon as={BiTransferAlt} className="text-6xl !text-teal-600" />
              <div>
                local
                <video
                  className="w-80 rounded-2xl"
                  autoPlay
                  // ref={localVideoRef}
                  muted
                />
              </div>
              <div>
                remote
                <video
                  className="w-80 rounded-2xl"
                  autoPlay
                  // ref={remoteVideoRef}
                />
              </div>
            </ModalBody>

            <Divider />

            <ModalFooter className="flex gap-4 w-fit mx-auto">
              <Button
                onClick={() => {
                  onClose();
                  navigate(-1);
                }}
              >
                <Icon className="text-4xl" as={FcEndCall} />
              </Button>

              <Button onClick={() => {}}>CONNECT</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  );
}

export default CallContainer;
