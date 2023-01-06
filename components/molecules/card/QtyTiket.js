import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function QtyTiket({ name, type, qty, price }) {
  return (
    <>
      <Box>
        <Text fontWeight={700} fontSize="lg">
          {name}
        </Text>
        <Text fontSize="xl">{`${type} • ${qty} Tiket`}</Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="end">
        <Text fontWeight={700} fontSize="2xl" color="green.600">
          {price}
        </Text>
      </Box>
    </>
  );
}
