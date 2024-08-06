import { useQuery } from "@tanstack/react-query";
import IsAuth from "../utils/IsAuth";
import { axiosClient } from "../api/api.client";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { IFriend } from "../types/friend.interface";
import useProfile from "../hooks/common/useProfile";
import { CiEdit } from "react-icons/ci";
function Profile() {
  const { profile } = useProfile();

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await axiosClient.get("/friends");
      return res.data;
    },
    select(res) {
      return res.data as IFriend[];
    },
  });

  return (
    <Container maxW={"5xl"} mt={3} p={3}>
      <Flex className="flex-col md:flex-row gap-5 justify-between">
        <Box flexGrow={1}>
          {profile && (
            <>
              <Stack direction={"row"} alignItems={"center"}>
                <Avatar src={profile.picture} boxSize={100} borderRadius={16} />

                <Center mx={1}>
                  <Divider orientation="vertical" h={"80px"} />
                </Center>

                <div className="flex flex-col justify-center grow">
                  <h3 className="text-xl text-teal-600 my-4 font-bold">
                    {profile.name}
                  </h3>
                  <span className="text-white/20 flex justify-between items-center max-w-48 text-sm">
                    BIO
                    <Icon
                      as={CiEdit}
                      className="!text-white text-2xl cursor-pointer "
                    />
                  </span>
                  <Tooltip label={profile.bio}>
                    <h6 className="ml-0.5 text-white/70 truncate text-sm text-wrap max-w-44 md:max-w-60 line-clamp-2">
                      {profile.bio}
                    </h6>
                  </Tooltip>
                </div>
              </Stack>
            </>
          )}
        </Box>
        <Box borderRadius={16} className="bg-teal-950/30">
          <h3 className="text-center my-2 font-black tracking-wider text-white/50 text-xl">
            Friends
          </h3>
          <Divider className="bg-teal-600" />
          {friends && (
            <>
              <Grid templateColumns="repeat(4, 1fr)" p={5} gap={3}>
                {friends.map((f) => (
                  <GridItem
                    cursor={"pointer"}
                    key={f?.id}
                    className="flex flex-col items-center"
                  >
                    <Avatar src={f.friend.picture} />
                    <h4 className="mt-2 font-bold">{f.friend.name}</h4>
                  </GridItem>
                ))}
                {!friends.length && (
                  <GridItem
                    colSpan={4}
                    className="text-center text-3xl font-black tracking-widest text-white/30"
                  >
                    Empty
                  </GridItem>
                )}
              </Grid>
              {friends?.length > 10 && (
                <Button w={"100%"} bg={"teal.600"}>
                  Show all
                </Button>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Container>
  );
}

export const ProfilePage = IsAuth(Profile);
