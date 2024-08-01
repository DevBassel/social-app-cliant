import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { z } from "zod";
import { IRegisterUser } from "../api/types/auth.interface";
import useRegister from "../hooks/api/auth/useRegister";

export default function RegisterPage() {
  const { RegisterMutate } = useRegister();
  const schema = z.object({
    email: z.string().email(),
    first_name: z.string().min(2, { message: "Invalid  name" }),
    last_name: z.string().min(2, { message: "Invalid  name" }),
    password: z.string().min(8).max(16),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  function submit(data: unknown) {
    RegisterMutate(data as IRegisterUser);
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      className="h-screen flex md:w-[470px] p-4 md:mx-auto w-full   flex-col justify-center"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className=" relative flex flex-col gap-5 border rounded-lg p-5 border-teal-700"
      >
        <Text className="text-3xl text-teal-600 font-bold text-center">
          Create An Account
        </Text>
        <Divider />
        <Box className="flex gap-5">
          <FormControl isInvalid={!!errors.first_name}>
            <Input
              type="text"
              className="w-full"
              placeholder="First Name"
              variant="outline"
              {...register("first_name")}
            />
            <FormErrorMessage>
              {errors.first_name && errors.first_name.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.last_name}>
            <Input
              type="text"
              className="w-full"
              placeholder="Last Name"
              variant="outline"
              {...register("last_name")}
            />
            <FormErrorMessage>
              {errors.last_name && errors.last_name.message?.toString()}
            </FormErrorMessage>
          </FormControl>{" "}
        </Box>

        <FormControl isInvalid={!!errors.email}>
          <Input
            type="text"
            className="w-full"
            placeholder="Email"
            variant="outline"
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message?.toString()}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <Input
            type="password"
            className="w-full"
            placeholder="password"
            variant="outline"
            {...register("password")}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message?.toString()}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit" className={`${"!bg-teal-600"}`}>
          Register
        </Button>

        <Box position="relative" my={3}>
          <Divider className="bg-teal-600" />
          <AbsoluteCenter className="bg-mainDark font-black">OR</AbsoluteCenter>
        </Box>

        <Button variant={"outline"}>
          <Icon as={FcGoogle} className="!text-2xl" mr={2} /> with google
        </Button>

        <div className="flex justify-end">
          <Link to={"/login"}>
            <Button variant={"link"} className="!text-teal-600 !text-sm">
              login?
            </Button>
          </Link>
        </div>
      </form>
    </motion.section>
  );
}
