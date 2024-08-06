import {
  Button,
  Divider,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { FcMenu } from "react-icons/fc";
import useActiveChate from "../../../hooks/common/useActiveChate";
import { Link } from "react-router-dom";
import useSocket from "../../../hooks/common/useSocket";
import { CallEvents } from "../../../types/socket/call-events.enum";
import useUserData from "../../../hooks/common/useUserData";

export default function ChatOpts() {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const { setActive } = useActiveChate();

  return (
    <div className="flex items-center gap-5">
      {!isMobile && <IconsMenu />}
      <Menu>
        <Tooltip label="options">
          <MenuButton as={Button}>
            <Icon as={FcMenu} className="text-2xl" />
          </MenuButton>
        </Tooltip>

        <MenuList>
          {isMobile && (
            <>
              <div className="flex justify-evenly ">
                <IconsMenu />
              </div>
              <Divider my={3} />
            </>
          )}
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={() => setActive?.(null)}>Close chate</MenuItem>
          <MenuItem>Block</MenuItem>
          <MenuItem bg={"red.900"}>Remove Friend</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

function IconsMenu() {
  const { socket } = useSocket();
  const { chatUserData } = useActiveChate();
  const me = useUserData();
  return (
    <>
      <Tooltip label={"call"}>
        <Button
          onClick={() => {
            console.log("call...", {
              from: { id: me?.id, name: me?.name, picture: me?.picture },
              to: chatUserData?.id,
            });
            console.log(socket);
            socket.emit(CallEvents.CALL_OFFER, {
              from: { id: me?.id, name: me?.name, picture: me?.picture },
              toId: chatUserData?.id,
            });
          }}
          className="text-4xl"
        >
          <Link to="call">CALL</Link>
        </Button>
      </Tooltip>
    </>
  );
}
