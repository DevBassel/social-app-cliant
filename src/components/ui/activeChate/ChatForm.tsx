import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useActiveChate from "../../../hooks/common/useActiveChate";
import { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  Textarea,
} from "@chakra-ui/react";
import ViewMediaMsg from "../ViewMediaMsg";
import { FcAddImage } from "react-icons/fc";
import { BsFillSendFill } from "react-icons/bs";
import useSocket from "../../../hooks/common/useSocket";
import { ChatEvents } from "../../../types/socket/chat-events.enum";

function ChatForm({ sendMsg }: { sendMsg(arg0: FormData): void }) {
  const { activeChate, chatUserData } = useActiveChate();
  const [media, setMedia] = useState<File | null>(null);
  const { socket } = useSocket();
  const [typing, setTyping] = useState(false);
  let typingTimeout: number | undefined;

  const handleKeyDown = () => {
    console.log("typing ...");
    if (!typing) {
      setTyping(true);
      socket.emit(ChatEvents.START_TYPING, { userId: chatUserData?.id });
    }

    clearTimeout(typingTimeout);
  };

  const handleKeyUp = () => {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setTyping(false);
      socket.emit(ChatEvents.STOP_TYPING, { userId: chatUserData?.id });
    }, 1000);
  };
  const schema = z.object({
    msg: z.string().min(1, {
      message: "min length of msg: 1 char",
    }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<{ msg: string }>({
    resolver: zodResolver(schema),
  });

  const submit = (data: { msg: string }) => {
    const formData = new FormData();
    if (activeChate) {
      formData.append("content", data.msg);
      media && formData.append("media", media);
      formData.append("chatId", activeChate.toString());

      sendMsg(formData);
    }
    setMedia(null);

    reset();
  };

  const handelFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      console.log(file.type);
    }
  };

  const clearFile = () => {
    setMedia(null);
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex items-center gap-2 mt-1"
    >
      <FormControl isInvalid={!!errors.msg}>
        <FormErrorMessage className="ml-5 my-1">
          {errors.msg && errors.msg.message?.toString()}
        </FormErrorMessage>
        <Textarea
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          resize={"none"}
          rows={2}
          {...register("msg")}
        />
      </FormControl>

      {media && <ViewMediaMsg media={media} clear={clearFile} />}

      <Button size={"sm"} className="relative overflow-hidden ">
        <input
          type="file"
          onChange={handelFile}
          className="absolute !w-10 top-0 left-0 z-10  opacity-0 cursor-pointer"
        />
        <Icon
          as={FcAddImage}
          className="text-3xl cursor-pointer absolute top-0 left-0"
        />
      </Button>
      <Button type="submit">
        <Icon as={BsFillSendFill} />
      </Button>
    </form>
  );
}

export default ChatForm;
