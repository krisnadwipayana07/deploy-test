import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function DetailWisataBreadcrumbs({ city, name, cityId }) {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/" color="green">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {/* <BreadcrumbItem>
        <BreadcrumbLink href={"/"} color="green">
          {city}
        </BreadcrumbLink>
      </BreadcrumbItem> */}

      <BreadcrumbItem isCurrentPage>
        <Text>{name} </Text>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
