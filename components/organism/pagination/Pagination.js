import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import React from "react";

export default function Pagination({ page, handlePage, totalPage }) {
  let elements = [];
  for (let i = 1; i <= totalPage; i++) {
    elements.push(i);
  }
  // console.log(page, elements);

  if (totalPage === 0 || totalPage === undefined) {
    return;
  }

  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="ghost"
        disabled={page <= 1}
        onClick={() => handlePage(page - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      {elements
        .slice(
          0,
          page < 3 ? totalPage : totalPage > page + 2 ? page + 2 : totalPage
        )
        .map((item, key) => (
          <Button
            key={key}
            variant="ghost"
            borderRadius=""
            fontWeight
            color={page === item && "#2563EB"}
            onClick={() => handlePage(item)}
            borderBlockEnd={page === item && "1px solid #2563EB"}
          >
            {item}
          </Button>
        ))}
      <Button
        variant="ghost"
        disabled={page === totalPage}
        onClick={() => handlePage(page + 1)}
      >
        <ChevronRightIcon />
      </Button>
    </Box>
  );
}
