import { Box, Center, Divider, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <Box
        bgColor="#2A3342"
        display="flex"
        flexDir="column"
        alignItems="center"
        px="10"
      >
        <Box py="5">
          <Image
            src="/assets/logo/atix-logo.png"
            alt="atix-logo"
            width="100%"
            height="40%"
          />
        </Box>
        <Divider />
        <Text py="5" color="gray" fontWeight={500}>
          © 2022 ATIX.id. All rights reserved.
        </Text>
      </Box>
    </footer>
  );
}
