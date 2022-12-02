import { Box } from "@chakra-ui/react";
import React from "react";

export default function Tag({ children }) {
  return (
    <Box display="flex">
      <Box
        borderRadius="20px"
        bgColor="#DCFCE7"
        color="#22C55E"
        px="2"
        fontWeight={500}
      >
        {children}
      </Box>
    </Box>
  );
}
