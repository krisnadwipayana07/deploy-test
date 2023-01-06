import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";

export default function DestinationSearch({ handleChange, handleSubmit }) {
  const { t } = useTranslation("");
  const [isMobile] = useMediaQuery("(max-width: 800px)");

  return (
    <Box
      bgColor="white"
      p="5"
      w={isMobile ? "sm" : "xl"}
      borderRadius="10"
      boxShadow="dark-lg"
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel color="gray">{t("home.form-name")}</FormLabel>
          <Box display="flex">
            <Input
              variant="flushed"
              placeholder={t("home.form-placeholder")}
              onChange={handleChange}
            />
            <Button colorScheme="green" type="submit">
              {t("home.form-button")}
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
}
