import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IDRConvert } from "../../../utils/tools/IDRConvert";

export default function TiketCard({
  index,
  name,
  type,
  price,
  qty,
  handleAddQty,
  handleMinQty,
}) {
  return (
    <SimpleGrid columns={4} py="4">
      <Box>
        <Text fontWeight={600} fontSize="24px">
          {name}
        </Text>
        <Text fontWeight={500} fontSize="18px">
          {type}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Text fontWeight={600} fontSize="24px" color="#3D734D">
          {IDRConvert.format(price)}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          display="flex"
          alignItems="center"
          border="2px solid #3D734D"
          ml="3"
        >
          <IconButton
            disabled={qty <= 0}
            variant="ghost"
            borderRadius="0"
            borderRight="2px solid #3D734D"
            onClick={() => handleMinQty()}
          >
            <MinusIcon />
          </IconButton>
          <Text px="5">{qty} </Text>
          <IconButton
            variant="ghost"
            borderRadius="0"
            borderLeft="2px solid #3D734D"
            onClick={() => handleAddQty()}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Text fontWeight={600} fontSize="24px" color="#3D734D">
          {IDRConvert.format(price * qty)}
        </Text>
      </Box>
    </SimpleGrid>
  );
}
