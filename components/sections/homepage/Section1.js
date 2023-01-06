import { Box, Center, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState, useTransition } from "react";
import Navbar from "../../organism/navbar/Navbar";
import DestinationSearch from "../../organism/search/DestinationSearch";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Section1() {
  const { t } = useTranslation("");
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 800px)");

  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push("/search?keyword=" + keyword);
  };
  return (
    <Box
      bg="linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 0%), url('/assets/bg-image/home.png')"
      minHeight="xl"
      bgSize="cover"
      bgPos="center"
      px={isMobile ? "2" : "10"}
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
          <Text textAlign="center" fontWeight={700} fontSize="60px">
            ATIX E-Ticketing
          </Text>
          <Text fontWeight={500} fontSize="20px" color="#556987">
            {t("home.experience")}
          </Text>
          <DestinationSearch
            handleChange={handleChange}
            handleSubmit={handleSearch}
          />
        </Box>
      </Box>
    </Box>
  );
}
