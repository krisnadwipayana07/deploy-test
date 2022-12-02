import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Stack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
// import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";
import BaseLayout from "../../components/layouts/BaseLayout";
import TransactionDetail from "../../components/molecules/card/TransactionDetail";

export default function qris() {
  var IDRConvert = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const datenow = new Date();
  console.log(datenow);

  const data = {
    price: 10000,
    code: 2837192731928731,
    merchantName: "KRISNA",
  };

  const handleCheckPayment = () => {
    axios
      .post(
        baseURL + url,
        {
          order_id: data.usr.order_id,
          no_va: data.usr.payment_metadata.va_no,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        const status = res.data.data.order_status;
        console.log(status);
        if (res.status === 200) {
          toast({
            title: "Status Pembayaran",
            description:
              status === "UNPAID"
                ? "Masih Belum Dibayarkan"
                : "Berhasil Dibayarkan",
            duration: 10000,
            status: status === "UNPAID" ? "warning" : "success",
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <SimpleGrid columns={2} py="10" px="20" spacing={10}>
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        bgColor="white"
        borderRadius="10px"
        p="5"
      >
        <Box>
          <Box
            display="inline-block"
            justifyContent="center"
            border="1px solid black"
            m="5"
          >
            <Image
              src="/assets/qris/logo.png"
              alt="shape1"
              width="100%"
              height="100%"
            />
            <Box display="flex" pt="3">
              <Box px="10" pt="20" pb="10" pos="relative">
                <Box
                  pos="absolute"
                  top="5"
                  left="0"
                  right="0"
                  textAlign="center"
                  fontWeight="700"
                  color="gray"
                >
                  <Text>{data?.merchantName}</Text>
                  <Text fontWeight="400">NMID : {data?.code}</Text>
                </Box>
                <Image
                  pos="absolute"
                  top="0px"
                  left="0px"
                  src="/assets/qris/shape1.png"
                  alt="shape1"
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "",
                  }}
                />
                <Image
                  pos="absolute"
                  bottom="0px"
                  right="0px"
                  src="/assets/qris/shape2.png"
                  alt="shape2"
                />
                <Text
                  pos="absolute"
                  bottom="0"
                  textAlign="center"
                  color="gray"
                  fontSize="13"
                  pb="2"
                >
                  Dicetak Oleh: Krisna
                </Text>
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value="893203429034820342903429834028340927304720"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Stack align="center">
          <Text fontWeight={700}>{IDRConvert.format(data?.price)}</Text>
          <Text fontWeight={700}>{data?.code}</Text>
          <Text fontWeight={700}>Expired: 03-12-2021 14:14:18</Text>
        </Stack>
      </Box>
      <Box>
        <TransactionDetail />
      </Box>
    </SimpleGrid>
  );
}

qris.getLayout = (page) => <BaseLayout>{page} </BaseLayout>;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
