import { Box, Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IDRConvert } from "../../../utils/tools/IDRConvert";

export default function MerchantCard({ index, name, img, price, location }) {
  const { t } = useTranslation();
  return (
    <Box bg="white" borderRadius="10px" maxW="sm" maxH="full" boxShadow="lg">
      <Image
        src={img}
        alt="card-image"
        width="75%"
        height="50%"
        layout="responsive"
        objectFit="cover"
        style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
      />
      <SimpleGrid px="5" py={3} spacing={3}>
        <Text minH="12" fontWeight={500} fontSize="16px">
          {name}
        </Text>
        <Text fontSize="16px">{location}</Text>
        <Box display="flex" alignItems="end" fontWeight={700} color="green">
          <Link href={"/detail-wisata/" + index}>{t("card.detail")}</Link>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
