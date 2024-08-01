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
import ForgetPassModel from "../components/models/ForgetPass.model";
import { LoginWithGoogle } from "../api/auth-calls";
import { ILoginUset } from "../api/types/auth.interface";
import useLogin from "../hooks/api/auth/useLogin";

export default function LoginPage() {
  const { LoginMutate, status } = useLogin();
  const schema = z.object({
    email: z.string().email({ message: "Email Not Valid" }),
    password: z
      .string()
      .min(8, { message: "Password min length 8" })
      .max(16, { message: "Password min length 16" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  function submit(data: unknown) {
    console.log(status);
    LoginMutate(data as ILoginUset);
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
        <Text className="text-3xl text-teal-600 font-bold">Login</Text>
        <Divider />

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

        <Button type="submit" className={`!bg-teal-600`}>
          Login
        </Button>

        <Box position="relative" my={3}>
          <Divider className="bg-teal-600" />
          <AbsoluteCenter className="bg-mainDark font-black">OR</AbsoluteCenter>
        </Box>

        <Button onClick={LoginWithGoogle} variant={"outline"}>
          <Icon as={FcGoogle} className="!text-2xl" mr={2} /> with google
        </Button>

        <div className="flex justify-between items-center ">
          <ForgetPassModel />

          <Link to={"/register"}>
            <Button variant={"link"} className="!text-teal-600 !text-sm">
              register?
            </Button>
          </Link>
        </div>
      </form>
    </motion.section>
  );
}
