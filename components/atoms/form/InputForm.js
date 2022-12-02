import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";

export default function InputForm({ name, value, handleChange, id, type }) {
  return (
    <Box display="flex" alignItems="center">
      <Text fontWeight={700} fontSize="16px">
        {name}
      </Text>
      <Input
        name={id}
        value={value}
        mx="2"
        w="20"
        type={"number"}
        onChange={handleChange}
      />
    </Box>
  );
}
