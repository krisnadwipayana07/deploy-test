import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Navbar from "../../organism/navbar/Navbar";

export default function SectionSearchNav({ name, handleChange }) {
  const { t } = useTranslation("");

  return (
    <div>
      <Box
        pos="absolute"
        bg="linear-gradient(180deg, rgba(21,88,40,0.5) 0%, rgba(21,88,40,0.5) 0%), url('/assets/bg-image/home.png')"
        minHeight="44"
        bgSize="cover"
        px="10"
        w="full"
        zIndex="-1"
      />
      <Navbar />
      <Box display="flex" justifyContent="center" py="7" mx="5">
        <Box bgColor="white" p="5" w="xl" borderRadius="10" boxShadow="lg">
          <form>
            <FormControl>
              <Text fontWeight={600} fontSize="20px" pb="4">
                {t("detail.search-header")}
              </Text>
              <FormLabel color="gray">{t("detail.form-name")}</FormLabel>
              <Box display="flex">
                <Input
                  variant="flushed"
                  type="search"
                  name="keyword"
                  placeholder={t("detail.form-placeholder")}
                  value={name}
                  onChange={(e) => handleChange(e)}
                />
                <Button type="submit" colorScheme="green">
                  {t("detail.form-button")}
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
    </div>
  );
}
