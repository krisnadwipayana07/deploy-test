import { Box, Center, Text } from "@chakra-ui/react";
import React, { useTransition } from "react";
import Navbar from "../../organism/navbar/Navbar";
import DestinationSearch from "../../organism/search/DestinationSearch";
import { useTranslation } from "next-i18next";

export default function Section1() {
  const { t } = useTranslation("");
  return (
    <Box
      bg="linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 0%), url('/assets/bg-image/home.png')"
      minHeight="xl"
      bgSize="cover"
      bgPos="center"
      px="10"
    >
      <Navbar />
      <Box py="20">
        <Center>
          <Text
            display="flex"
            color="white"
            bgColor="green"
            fontWeight={500}
            px="2"
            borderRadius="10"
          >
            {t("home.welcome")}
          </Text>
        </Center>
        <Box display="flex" flexDir="column" alignItems="center" gap={2}>
          <Text fontWeight={700} fontSize="60px">
            ATIX E-Ticketing
          </Text>
          <Text fontWeight={500} fontSize="20px" color="#556987">
            {t("home.experience")}
          </Text>
          <DestinationSearch />
        </Box>
      </Box>
    </Box>
  );
}
