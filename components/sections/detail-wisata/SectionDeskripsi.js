import { Box, Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import Tag from "../../atoms/Tag";
import draftToHtmlPuri from "draftjs-to-html";
import { convertToRaw } from "draft-js";

export default function SectionDeskripsi({ data }) {
  const { t } = useTranslation("");

  return (
    <Grid templateColumns="repeat(3, 1fr)" py="5">
      <GridItem colSpan={2}>
        <Tag>{t("detail.description")} </Tag>
        <Text py="2" fontWeight={600} fontSize="24px">
          {t("detail.desc-header")}
        </Text>
        <Box
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
            Rp. 5.000
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
