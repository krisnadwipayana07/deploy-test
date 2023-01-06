import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import Tag from "../../atoms/Tag";

export default function Section2({ topMerchant = [] }) {
  const dataDummy = [
    "pantai melasti",
    "pantai kuta",
    "goa lawah",
    "taman ayun",
    "alun alun kota bangli",
    "penglipuran",
    "taman ujung",
    "pura tirta empul",
    "warung dadi",
    "air terjun munduk",
  ];
  const { t } = useTranslation("");
  const [isMobile] = useMediaQuery("(max-width: 800px)");

  return (
    <Box py="7">
      <Center py="2">
        <Tag>{t("home.search")}</Tag>
      </Center>
      <Box>
        <Box
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="center"
          p={isMobile ? "1" : "5"}
          flexWrap="wrap"
          gap={2}
        >
          {topMerchant.map((item, key) => (
            <Link key={key} href={"/detail-wisata/" + item.id}>
              <Button
                variant="outline"
                colorScheme="green"
                textTransform="uppercase"
                mx="2"
                size={isMobile ? "sm" : "md"}
              >
                {item.merchant_name}
              </Button>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
