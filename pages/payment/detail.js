import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputFormHorizontal from "../../components/atoms/form/InputFormHorizontal";
import BaseLayout from "../../components/layouts/BaseLayout";
import QtyTiket from "../../components/molecules/card/QtyTiket";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
export default function Detail() {
  const { t } = useTranslation("");
  const router = useRouter();

  console.log(router.query);

  const detailValidationSchema = Yup.object().shape({
    name: Yup.string().required("Nama Harus Diisi"),
    email: Yup.string().email("Email Salah").required("Email Harus Diisi"),
    visit_date: Yup.date().required("Tanggal Harus diisi"),
    payment: Yup.string().required("Pilih Metode Pembayaran"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDetailData({ ...detailData, [name]: value });
  };
  return (
    <SimpleGrid columns={2} py="10" px="20" spacing={10}>
      <Box bgColor="white" borderRadius="10px" p="10">
        <Text fontWeight={700} fontSize="24px">
          {t("payment.header")}
        </Text>
        <Formik
          initialValues={{
            name: "",
            email: "",
            visit_date: "",
            payment: "",
          }}
          validationSchema={detailValidationSchema}
          // onSubmit={handleRegister}
        >
          {(props) => (
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    py="3"
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel>{t("payment.form.form-1")}</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.name} </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    py="3"
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{form.errors.email} </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="visit_date">
                {({ field, form }) => (
                  <FormControl
                    py="3"
                    isInvalid={
                      form.errors.visit_date && form.touched.visit_date
                    }
                  >
                    <FormLabel>{t("payment.form.form-2")}</FormLabel>
                    <Input {...field} type="date" />
                    <FormErrorMessage>
                      {form.errors.visit_date}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="payment">
                {({ field, form }) => (
                  <Box py="3">
                    <FormControl
                      isInvalid={form.errors.payment && form.touched.payment}
                    >
                      <FormLabel fontWeight={700}>
                        {t("payment.form.form-3")}
                      </FormLabel>
                      <RadioGroup colorScheme="green" {...field}>
                        <Stack spacing={5} direction="row">
                          <Radio {...field} value="qris">
                            <Image
                              src="/assets/logo/qris.png"
                              alt="qris"
                              width="100px"
                              height="50px"
                              objectFit="contain"
                            />
                          </Radio>
                          <Radio {...field} value="va">
                            <Box display="flex" alignItems="center">
                              <Image
                                src="/assets/logo/bpd.png"
                                alt="qris"
                                width="50px"
                                height="50px"
                                objectFit="contain"
                              />
                              <Text pl="2">Virtual Account</Text>
                            </Box>
                          </Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.payment}</FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>

              <Box display="flex" justifyContent="end">
                <Button type="submit" colorScheme="green">
                  {t("payment.form.button")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box>
        <Stack spacing={2} bgColor="white" borderRadius="10px" p="10">
          <Text textAlign="center" fontWeight={700} fontSize="24px">
            {t("payment.header-2")}
          </Text>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image
              src="/assets/default/monument.jpg"
              alt="qris"
              width="100px"
              height="70px"
              objectFit="cover"
              style={{
                borderRadius: "10px",
              }}
            />
            <Text px="5" fontWeight={700} fontSize="16px">
              Monumen Perjuangan Rakyat Bali
            </Text>
          </Box>
          <Divider py="2" />
          <SimpleGrid columns={2} spacingY={5} py="5">
            <QtyTiket />
            <QtyTiket />
            <QtyTiket />
            <Text fontWeight={700} fontSize="3xl">
              Total
            </Text>
            <Text
              textAlign="end"
              fontWeight={700}
              fontSize="3xl"
              pr="3"
              color="green.600"
            >
              Rp. 150.000,00
            </Text>
          </SimpleGrid>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}

Detail.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
