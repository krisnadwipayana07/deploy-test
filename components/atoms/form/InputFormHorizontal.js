import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

export default function InputFormHorizontal({
  name,
  value,
  handleChange,
  id,
  type,
  width,
  placeholder,
}) {
  return (
    <FormControl py="3">
      <FormLabel>{name}</FormLabel>
      <Input
        w={width}
        name={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </FormControl>
  );
}
