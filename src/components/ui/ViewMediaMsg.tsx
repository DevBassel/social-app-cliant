import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcMultipleCameras } from "react-icons/fc";

function ViewMediaMsg({ media, clear }: { media: File; clear(): void }) {
  const [open, setOpen] = useState(!!media);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip label="View uploaded Media">
        <Button size={"sm"} onClick={() => setOpen(true)}>
          <Icon className="text-2xl" as={FcMultipleCameras} />
        </Button>
      </Tooltip>

      <Modal onClose={onClose} size={"xl"} isOpen={open}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="capitalize">
            preview before sending
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className=" bg-slate-500 h-60 p-3  rounded-xl">
              {media.type.split("/")[0] === "image" && (
                <img
                  className="!max-w-full max-h-full  mx-auto"
                  src={URL.createObjectURL(media) || ""}
                  alt="media"
                />
              )}
              {media.type.split("/")[0] === "video" && (
                <video
                  className="!max-w-full mx-auto max-h-full"
                  controls
                  src={URL.createObjectURL(media) || ""}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter className="flex gap-5">
            <Button
              bg={"red.900"}
              onClick={() => {
                clear();
                onClose();
              }}
            >
              Clear
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewMediaMsg;
