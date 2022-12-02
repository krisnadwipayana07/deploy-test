import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export default function DestinationSearch() {
  const { t } = useTranslation("");
  return (
    <Box bgColor="white" p="5" w="xl" borderRadius="10" boxShadow="dark-lg">
      <FormControl>
        <FormLabel color="gray">{t("home.form-name")}</FormLabel>
        <Box display="flex">
          <Input variant="flushed" placeholder={t("home.form-placeholder")} />
          <Button colorScheme="green">{t("home.form-button")}</Button>
        </Box>
      </FormControl>
    </Box>
  );
}
