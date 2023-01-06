import { Box, Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Tag from "../../atoms/Tag";
import draftToHtmlPuri from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { IDRConvert } from "../../../utils/tools/IDRConvert";

export default function SectionDeskripsi({ data, listTicket = [], isMobile }) {
  const { t } = useTranslation("");

  const [lowestPrice, setLowestPrice] = useState(0);

  useEffect(() => {
    if (listTicket.length !== 0) {
      let price = listTicket[0].adult_price;
      listTicket?.map((ticket) => {
        const { adult_price, child_price } = ticket;
        if (child_price === 0) {
          price = price < adult_price ? price : adult_price;
        } else {
          if (adult_price < child_price) {
            price = price < adult_price ? price : adult_price;
          } else {
            price = price < child_price ? price : child_price;
          }
        }
      });
      setLowestPrice(price);
    }
  }, [listTicket]);

  return (
    <Grid
      templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
      py="5"
    >
      <GridItem colSpan={isMobile ? 1 : 2}>
        <Tag>{t("detail.description")} </Tag>
        <Text py="2" fontWeight={600} fontSize="24px">
          {t("detail.desc-header")}
        </Text>
        <Box
          textAlign="justify"
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        />
      </GridItem>
      <GridItem display="flex" flexDir="column" p="5" justifyContent="center">
        <Stack
          border="1px solid #3A35414D"
          borderRadius="10px"
          p="8"
          spacing={2}
        >
          <Text color="gray">{t("detail.tiket.price")}</Text>
          <Text fontWeight={600} fontSize="32px">
            {IDRConvert.format(lowestPrice)}
          </Text>
          <Link href="#tiket">
            <Button w="full" colorScheme="green">
              {t("detail.tiket.button")}
            </Button>
          </Link>
        </Stack>
      </GridItem>
    </Grid>
  );
}
