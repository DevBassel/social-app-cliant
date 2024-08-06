import { Avatar, Divider, Icon, Stack, Tooltip } from "@chakra-ui/react";
import useProfile from "../../hooks/common/useProfile";
import { Link, useNavigate } from "react-router-dom";
import { FcExternal, FcHome, FcSms } from "react-icons/fc";
import { motion } from "framer-motion";
import { logOut } from "../../api/auth-calls";

const SideBarItems = [
  {
    id: 1,
    name: "Home",
    icon: FcHome,
    link: "/",
  },
  {
    id: 2,
    name: "Chats",
    icon: FcSms,
    link: "/chats",
  },
];

function SideBarCom() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  return (
    profile && (
      <Stack
        direction={"column"}
        position={"relative"}
        left={0}
        className="bg-teal-600/10 text-3xl"
        h={"100%"}
        top={0}
        p={2}
      >
        <Tooltip label={"Profile"} placement="right">
          <Link to={"/profile"}>
            <Avatar src={profile.picture} boxSize={8} cursor={"pointer"} />
          </Link>
        </Tooltip>
        <Divider my={1} />

        {SideBarItems.map((item) => (
          <Tooltip key={item.id} label={item.name} placement="right">
            <motion.div whileTap={{ scale: 0.9, rotateZ: 10 }}>
              <Link
                to={item.link}
                className="flex items-center grow justify-center mb-3"
              >
                <Icon as={item.icon} />
              </Link>
            </motion.div>
          </Tooltip>
        ))}
        <Tooltip label={"Log Out"} placement="right">
          <motion.div
            whileTap={{ scale: 0.9, x: -4 }}
            onClick={() => {
              logOut();
              navigate("/login");
            }}
          >
            <Icon as={FcExternal} className="-rotate-90" />
          </motion.div>
        </Tooltip>
      </Stack>
    )
  );
}
export const SideBar = SideBarCom;
