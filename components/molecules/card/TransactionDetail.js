import { Box, Button, Divider, SimpleGrid, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

export default function TransactionDetail({
  handleCheckPayment,
  price,
  fee,
  total,
  name,
  phone,
  email,
}) {
  var IDRConvert = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const { t } = useTranslation("");
  return (
    <Box bgColor="white" borderRadius="10px" p="10">
      <Text textAlign="center" fontWeight={700} fontSize="20px">
        {t("trx-detail.sec-1.header")}
      </Text>
      <SimpleGrid columns={2} py="7" spacing={3}>
        <Text>{t("trx-detail.sec-1.col-1")}</Text>
        <Text textAlign="end" fontWeight={700}>
          {IDRConvert.format(price)}
        </Text>
        <Text>Admin Fee</Text>
        <Text textAlign="end" fontWeight={700}>
          {IDRConvert.format(fee)}
        </Text>
        <Text>Grand Total</Text>
        <Text textAlign="end" fontWeight={700}>
          {IDRConvert.format(total)}
        </Text>
      </SimpleGrid>
      <Divider />
      <Text textAlign="center" fontWeight={700} fontSize="20px" pt="10">
        {t("trx-detail.sec-2.header")}
      </Text>
      <SimpleGrid columns={2} py="7" spacing={3}>
        <Text>{t("trx-detail.sec-2.col-1")}</Text>
        <Text>: {name}</Text>
        <Text>Email</Text>
        <Text>: {email}</Text>
        <Text>{t("trx-detail.sec-2.col-2")}</Text>
        <Text>: {phone}</Text>
      </SimpleGrid>
      <Text fontWeight={700}>
        <span style={{ color: "red" }}>* </span>
        {t("trx-detail.sec-2.text")}
      </Text>
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
    </Box>
  );
}
