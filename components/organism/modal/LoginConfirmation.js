import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { loginRequest, registerRequest } from "../../../utils/api/AuthApi";
import * as Yup from "yup";

export default function LoginConfirmation({ open, handleClose }) {
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmationPassword, setOpenConfirmationPassword] =
    useState(false);

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

  const handleLogin = () => {
    setLoading(true);

    loginRequest(loginData)
      .then((res) => {
        localStorage.setItem("token", res.data.data.access_token);
        localStorage.setItem("name", res.data.data.name);
        router.push("/payment/detail");
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegister = (value, actions) => {
    console.log(value);
    registerRequest(value)
      .then((res) => {
        if (res.status === 200) {
          loginRequest(value).then((res) => {
            localStorage.setItem("token", res.data.data.access_token);
            localStorage.setItem("name", res.data.data.name);
            toast({
              title: "Account Already Created",
              description: "Congratulations, You're Already create account",
              status: "success",
              isClosable: true,
              onCloseComplete: () => router.push("/payment/detail"),
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">
            Silahkan Login untuk melanjutkan atau dapat melalui metode express
            checkout di bawah
          </Text>
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels border="1px solid gray.500">
              <TabPanel>
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
                <Button
                  disabled={loginData.email === "" || loginData.password === ""}
                  w="full"
                  colorScheme="green"
                  onClick={handleLogin}
                  isLoading={loading}
                  mt="4"
                >
                  Login
                </Button>
              </TabPanel>
              <TabPanel>
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
                                  {openPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
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
                      <Button
                        w="full"
                        type="submit"
                        colorScheme="green"
                        isLoading={props.isSubmitting}
                        mt="4"
                      >
                        Register
                      </Button>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Text pb="2" textAlign="center">
            atau
          </Text>
          <Link href="/payment/detail">
            <Button w="full" colorScheme="orange">
              Continue as a guest
            </Button>
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
