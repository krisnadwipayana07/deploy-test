import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Stack,
  Divider,
  Button,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import BaseLayout from "../../components/layouts/BaseLayout";
import TransactionDetail from "../../components/molecules/card/TransactionDetail";
import { CallbackQris, GenerateQris } from "../../utils/api/SalesApi";

export default function Qris() {
  const router = useRouter();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 800px)");
  const { sales_id, email } = router.query;

  var IDRConvert = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const [data, setData] = useState();
  // console.log(data);

  useEffect(() => {
    console.log(sales_id);
    if (sales_id) {
      GenerateQris({ salesId: parseInt(sales_id), terminalId: "A01" })
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [sales_id]);

  const handleCheckPayment = () => {
    CallbackQris({ sales_id: parseInt(sales_id) })
      .then((res) => {
        const status = res.data.data.sales_status;
        toast({
          title: status,
          description: "transaksi anda " + status,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <SimpleGrid
      columns={[1, 2]}
      py="10"
      px={isMobile ? "5" : "20"}
      spacing={10}
    >
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
                  <Text fontWeight="400">NMID : {data?.nmid}</Text>
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
                  Dicetak Oleh: {data?.merchantName}
                </Text>
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={data?.qrValue === undefined ? "" : data?.qrValue}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Stack align="center">
          <Text fontWeight={700}>{IDRConvert.format(data?.amount)}</Text>
          <Text fontWeight={700}>{data?.billNumber}</Text>
          <Text fontWeight={700}>Expired: {data?.expiredDate} </Text>
        </Stack>
      </Box>
      <Box>
        <TransactionDetail
          handleCheckPayment={handleCheckPayment}
          name={data?.nama}
          email={email}
          fee={data?.fee}
          price={data?.amount}
          total={data?.totalAmount}
        />
      </Box>
    </SimpleGrid>
  );
}

Qris.getLayout = (page) => <BaseLayout>{page} </BaseLayout>;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
