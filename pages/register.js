import { ArrowBackIcon, Icon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  Toast,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { client } from "../utils/api/BaseApi";
import * as Yup from "yup";
import { registerRequest } from "../utils/api/AuthApi";

export default function Login() {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const { t } = useTranslation();
  const [isMobile] = useMediaQuery("(max-width: 800px)");
  const toast = useToast();

  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmationPassword, setOpenConfirmationPassword] =
    useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required("Nama Harus Diisi"),
    email: Yup.string().email("Email Salah").required("Email Harus Diisi"),
    password: Yup.string().required("Password Harus Diisi"),
    confirm_password: Yup.string()
      .required("Konfirmasi Password Harus Diisi")
      .test(
        "passwords-match",
        "Konfirmasi Password Harus Sama",
        function (value) {
          return this.parent.password === value;
        }
      ),
    phone: Yup.number("Number Only"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "password" && passwordRegex.test(value) === false) {
      setErrorData({
        ...errorData,
        [name]: "password minimal 8 character, 1 huruf kecil dan 1 huruf besar",
      });
    }
  };

  const handleRegister = (value, actions) => {
    console.log(value);
    registerRequest(value)
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Account Already Created",
            description: "Congratulations, You're Already create account",
            status: "success",
            isClosable: true,
            onCloseComplete: () => window.location.replace("/login"),
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            title: "User Already Created",
            description: "Please use another credential",
            status: "warning",
            isClosable: true,
          });
        }
      })
      .finally(() => actions.setSubmitting(false));
  };
  return (
    <Box bgColor="#F5F5F5" minH="100vh" p={isMobile ? "5" : "12"}>
      <SimpleGrid
        columns={[1, 2]}
        bgColor="white"
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
            {t("register.content")}
          </Text>
        </Box>
        <Box display="flex" p="7">
          <IconButton
            onClick={() => window.history.back()}
            size="lg"
            variant="ghost"
          >
            <ArrowBackIcon />
          </IconButton>
          <Box w="full">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirm_password: "",
                phone: "",
              }}
              validationSchema={registerValidationSchema}
              onSubmit={handleRegister}
            >
              {(props) => (
                <Form>
                  <Stack spacing="5" w="full">
                    <Text fontWeight={700} fontSize="35px" color="#3D734D">
                      Register
                    </Text>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel>Email</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel>Password</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              type={openPassword ? "text" : "password"}
                            />
                            <InputRightElement>
                              <IconButton
                                onClick={() => setOpenPassword(!openPassword)}
                              >
                                {openPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </IconButton>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="confirm_password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.confirm_password &&
                            form.touched.confirm_password
                          }
                        >
                          <FormLabel>{t("register.form.form-1")}</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              type={
                                openConfirmationPassword ? "text" : "password"
                              }
                            />
                            <InputRightElement>
                              <IconButton
                                onClick={() =>
                                  setOpenConfirmationPassword(
                                    !openConfirmationPassword
                                  )
                                }
                              >
                                {openConfirmationPassword ? (
                                  <ViewIcon />
                                ) : (
                                  <ViewOffIcon />
                                )}
                              </IconButton>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.confirm_password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.phone && form.touched.phone}
                        >
                          <FormLabel>{t("register.form.form-2")}</FormLabel>
                          <Input {...field} type="number" />
                          <FormErrorMessage>
                            {form.errors.phone}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Box
                      display="flex"
                      justifyContent="end"
                      color="#3D734D"
                      fontWeight={500}
                    >
                      <Link href="/login">{t("register.login")}</Link>
                    </Box>
                    <Button
                      w="full"
                      type="submit"
                      colorScheme="green"
                      isLoading={props.isSubmitting}
                    >
                      Register
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
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
