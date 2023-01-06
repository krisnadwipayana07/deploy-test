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
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import TransactionDetail from "../../components/molecules/card/TransactionDetail";
import { CallbackVa, GenerateQris, GenerateVa } from "../../utils/api/SalesApi";

export default function Va() {
  var IDRConvert = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const [isMobile] = useMediaQuery("(max-width: 800px)");
  const toast = useToast();
  const router = useRouter();
  const { sales_id, email } = router.query;

  const [data, setData] = useState();
  // console.log(data);

  const { hasCopied: h1, onCopy: copyNoTagihan } = useClipboard(data?.no_va);
  const { hasCopied: h2, onCopy: copyAtm } = useClipboard(
    data?.va_prefix + data?.no_va
  );
  const { hasCopied: h3, onCopy: copyTotal } = useClipboard(data?.tagihan);

  const [openDetail, setOpenDetail] = useState(true);

  useEffect(() => {
    console.log(sales_id);
    if (sales_id) {
      GenerateVa({ salesId: parseInt(sales_id) })
        .then((res) => {
          console.log(res);
          setData(res.data.data.data[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [sales_id]);

  useEffect(() => {
    if (h1 || h2 || h3) {
      toast({
        title: "Text Disalin",
        description: "Berhasil menyalin text",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [h1, h2, h3]);

  const handleCheckPayment = () => {
    CallbackVa({ sales_id: parseInt(sales_id) })
      .then((res) => {
        console.log(res);
        const status = res.data.sales_status;
        // console.log(status);
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
    <Box p={isMobile ? "3" : "10"}>
      <Box bgColor="white" p="5" borderRadius="30px" boxShadow="xl">
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
                  {data?.no_va}
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
                  {data?.va_prefix + data?.no_va}
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
                  {IDRConvert.format(data?.tagihan)}
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
            w={isMobile ? "100%" : "50%"}
            variant="outline"
            colorScheme="green"
            onClick={() => setOpenDetail(!openDetail)}
          >
            Detail Transaksi
          </Button>
          <Box py="10" hidden={openDetail}>
            <TransactionDetail
              handleCheckPayment={handleCheckPayment}
              name={data?.nama}
              email={email}
              fee={0}
              price={parseInt(data?.tagihan)}
              total={parseInt(data?.tagihan)}
            />
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
