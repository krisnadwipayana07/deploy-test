import { CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useRef, useState } from "react";
import InputFormHorizontal from "../components/atoms/form/InputFormHorizontal";
import GetLocalStorage from "../components/atoms/GetLocalStorage";
import BaseLayout from "../components/layouts/BaseLayout";
import DialogConfirmation from "../components/molecules/dialog/DialogConfirmation";
import { editUserRequest, getDetailUserRequest } from "../utils/api/UserApi";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import InputFormPassword from "../components/atoms/form/InputFormPassword";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function Profile() {
  const { t } = useTranslation("");
  const toast = useToast();

  const cancelRef = useRef();
  const [passChange, setPassChange] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confPass: "",
  });
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [decoded, setDecoded] = useState();
  const [loading, setLoading] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmationPassword, setOpenConfirmationPassword] =
    useState(false);

  const disabled = Object.entries(data).every((item) => item[1] === "");

  useEffect(() => {
    const decode = jwt_decode(localStorage.getItem("token"));
    getDetailUserRequest(decode?.data?.id).then((res) => {
      if (res.status === 200) {
        setData({
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.phone,
          password: res.data.data.password,
          confPass: "",
        });
        console.log(res.data.data);
      }
    });
    setDecoded(decode);
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    editUserRequest(decoded?.data.id, data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("name", data.name);
          toast({
            title: "User Changes Saved",
            description: "Your Changes saved",
            status: "success",
            isClosable: true,
            duration: 3000,
            onCloseComplete: () => window.location.reload(),
          });
        }
      })
      .catch((err) => console.log(err));
    setOpenConfirmation(false);
    setLoading(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleEnter = (e) => {
    e.preventDefault();
    setOpenConfirmation(true);
  };

  return (
    <Box p="10">
      <Box bgColor="white" p="10" borderRadius="10px">
        <Text fontWeight={700} fontSize="24px">
          User Setting
        </Text>
        <form onSubmit={handleEnter}>
          <InputFormHorizontal
            id="name"
            name={t("profile.form-1.name")}
            placeholder={t("profile.form-1.placeholder")}
            value={data.name}
            handleChange={handleChange}
          />
          <InputFormHorizontal
            id="email"
            name={t("profile.form-5.name")}
            placeholder={t("profile.form-5.placeholder")}
            type="email"
            value={data.email}
            handleChange={handleChange}
            isDisable={true}
          />
          <InputFormHorizontal
            id="phone"
            name={t("profile.form-2.name")}
            placeholder={t("profile.form-2.placeholder")}
            value={data.phone}
            type="number"
            handleChange={handleChange}
          />
          {/* <Button
          hidden={!passChange}
          variant="ghost"
          onClick={handleOpenChangePassword}
          >
          Change Password ?
        </Button> */}
          <Box>
            {/* <Box display="flex" justifyContent="end">
            <IconButton colorScheme="red" onClick={handleCloseChangePassword}>
            <CloseIcon />
            </IconButton>
          </Box> */}
            <InputFormPassword
              id="password"
              name={t("profile.form-3.name")}
              placeholder={t("profile.form-3.placeholder")}
              value={data.password}
              handleChange={handleChange}
            />
            <InputFormPassword
              id="confPass"
              name="Konfirmasi Password"
              placeholder="konfirmasi password baru"
              value={data.confPass}
              handleChange={handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="center" py="5">
            <Button
              disabled={disabled}
              colorScheme="green"
              px="10"
              type="submit"
            >
              Simpan
            </Button>
          </Box>
        </form>
      </Box>
      <DialogConfirmation
        isOpen={openConfirmation}
        body="Apakah anda yakin ingin melanjutkan?"
        header="Konfirmasi"
        color="green"
        onSubmit={handleSubmit}
        onClose={() => setOpenConfirmation(false)}
      />
    </Box>
  );
}

Profile.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
