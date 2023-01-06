import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { client } from "../utils/api/BaseApi";
import { loginRequest } from "../utils/api/AuthApi";

export default function Login() {
  const { t } = useTranslation("");
  const [isMobile] = useMediaQuery("(max-width: 800px)");
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleLogin = () => {
    setLoading(true);

    loginRequest(loginData)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("token", res.data.data.access_token);
        localStorage.setItem("name", res.data.data.name);
        window.location.replace("/");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast({
            title: "Invalid User Credential",
            description: "Email or Password are incorrect, please try again",
            status: "warning",
          });
        }
        if (err.response.status === 404) {
          toast({
            title: "User Not Found",
            description:
              "Your Account isn't register yet, Please register first",
            status: "error",
            isClosable: true,
          });
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <Box bgColor="#F5F5F5" minH="100vh" p={isMobile ? "5" : "20"}>
      <SimpleGrid
        columns={[1, 2]}
        bgColor="white"
        minH="70vh"
        borderRadius="10px"
        boxShadow="dark-lg"
      >
        <Box
          hidden={isMobile}
          w="full"
          h="full"
          bg="linear-gradient(180deg, rgba(21,88,40,0.5) 0%, rgba(21,88,40,0.5) 0%), url('/assets/bg-image/login.png')"
          bgSize="cover"
          bgPos="center"
          borderTopLeftRadius="10px"
          borderBottomLeftRadius="10px"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src="/assets/logo/atix-white.png"
            alt="atix-logo"
            width="200px"
            height="90px"
            layout="fixed"
          />
          <Text color="white" textAlign="center" fontWeight={500}>
            {t("login.content")}
          </Text>
        </Box>
        <Box p="5">
          <IconButton
            onClick={() => window.history.back()}
            size="lg"
            variant="ghost"
          >
            <ArrowBackIcon />
          </IconButton>
          <Stack p="5" spacing="3">
            <Text fontWeight={700} fontSize="45px" color="#3D734D">
              Login
            </Text>
            <Text>{t("login.header")}</Text>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                onChange={handleChange}
                value={loginData.email}
                type="email"
              />
            </FormControl>
            <FormControl onChange={handleChange}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  onChange={handleChange}
                  value={loginData.password}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box
              display="flex"
              justifyContent="end"
              color="#3D734D"
              fontWeight={500}
            >
              <Link href="/register">{t("login.register")}</Link>
            </Box>
            <Button
              disabled={loginData.email === "" || loginData.password === ""}
              w="full"
              colorScheme="green"
              onClick={handleLogin}
              isLoading={loading}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
