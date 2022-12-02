import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Field } from "formik";
import React, { useState } from "react";

export default function InputFormPassword({
  name,
  value,
  handleChange,
  id,
  width,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl py="3">
      <FormLabel>{name}</FormLabel>
      <InputGroup>
        <Input
          w={width}
          name={id}
          value={value}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <InputRightElement>
          <IconButton
            variant="ghost"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </IconButton>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
