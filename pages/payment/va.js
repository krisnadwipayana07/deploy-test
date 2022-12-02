import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import TransactionDetail from "../../components/molecules/card/TransactionDetail";

export default function Va() {
  var IDRConvert = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const toast = useToast();

  const { hasCopied: h1, onCopy: copyNoTagihan } = useClipboard("test");
  const { hasCopied: h2, onCopy: copyAtm } = useClipboard("test");
  const { hasCopied: h3, onCopy: copyTotal } = useClipboard("test");

  const [openDetail, setOpenDetail] = useState(true);

  useEffect(() => {
    toast({
      title: "Text Disalin",
      description: "Berhasil menyalin text",
      duration: 1000,
      isClosable: true,
    });
  }, [h1, h2, h3]);

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
    <Box p="10">
      <Box bgColor="white" p="5" borderRadius="30px">
        <Box display="flex" flexDir="column" alignItems="center" py="10">
          <Box maxW="2xl" border="1px solid #E0E0E0" borderRadius="10px">
            <SimpleGrid columns={2} alignItems="center" p="3">
              <Text fontWeight="600" fontSize="20">
                Virtual Account
              </Text>
              <Box display="flex" justifyContent="end">
                <Image
                  src="/assets/logo/bpd.png"
                  alt="bpd-va"
                  width="70px"
                  height="70px"
                  objectFit="contain"
                />
              </Box>
            </SimpleGrid>
            <Divider />
            <SimpleGrid columns={2} alignItems="center" p="3">
              <Box>
                <Text>Nomor Tagihan Virtual Account BPD Bali</Text>
                <Text fontWeight="600" fontSize="20">
                  520770741431588
                </Text>
              </Box>
              <Box display="flex" justifyContent="end">
                <Button variant="ghost" onClick={copyNoTagihan}>
                  <Box display="flex" color="green">
                    Salin <CopyIcon />
                  </Box>
                </Button>
              </Box>
              <Box>
                <Text>ATM Bersama/Online/E-Banking Bank Lain</Text>
                <Text fontWeight="600" fontSize="20">
                  520770741431588
                </Text>
              </Box>
              <Box display="flex" justifyContent="end">
                <Button variant="ghost" onClick={copyAtm}>
                  <Box display="flex" color="green">
                    Salin <CopyIcon />
                  </Box>
                </Button>
              </Box>
              <Box>
                <Text>Total Pembayaran</Text>
                <Text fontWeight="600" fontSize="20">
                  {IDRConvert.format(120000)}
                  <IconButton variant="ghost" color="green" onClick={copyTotal}>
                    <CopyIcon />
                  </IconButton>
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
          <SimpleGrid columns={[1, 2]} spacing={2} py="4">
            <Button
              variant="outline"
              colorScheme="green"
              onClick={handleCheckPayment}
            >
              Cek Status Pembayaran
            </Button>
            <Link href="/">
              <Button colorScheme="green">Belanja Lagi</Button>
            </Link>
          </SimpleGrid>
          <Button
            w="xl"
            variant="outline"
            colorScheme="green"
            onClick={() => setOpenDetail(!openDetail)}
          >
            Detail Transaksi
          </Button>
          <Box py="10" hidden={openDetail}>
            <TransactionDetail />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

Va.getLayout = (page) => <BaseLayout>{page} </BaseLayout>;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
