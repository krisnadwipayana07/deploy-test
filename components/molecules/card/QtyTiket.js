import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function QtyTiket() {
  return (
    <>
      <Box>
        <Text fontWeight={700} fontSize="lg">
          Tiket Masuk Nusantara
        </Text>
        <Text fontSize="xl">Dewasa • 2 Tiket</Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="end">
        <Text fontWeight={700} fontSize="2xl" color="green.600">
          Rp. 50.000
        </Text>
      </Box>
    </>
  );
}
