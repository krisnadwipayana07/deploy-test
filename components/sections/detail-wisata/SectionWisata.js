import { Box, Divider, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import DetailWisataBreadcrumbs from "../../molecules/breadcrumbs/DetailWisataBreadcrumbs";
import { MdLocationOn, MdPhoneInTalk } from "react-icons/md";

export default function SectionWisata({ data, isMobile }) {
  return (
    <Box py="5">
      <DetailWisataBreadcrumbs
        city={data?.district}
        name={data?.merchant_name}
      />
      <Text fontWeight={700} fontSize="36px" py="3">
        {data?.merchant_name}
      </Text>
      <Image
        src={
          "https://atixbali.oss-ap-southeast-5.aliyuncs.com/" + data?.header_img
        }
        alt={data?.merchant_name}
        width="100%"
        height="30%"
        layout="responsive"
        objectFit="cover"
        style={{
          borderRadius: "10px",
        }}
      />
      <Box py="3">
        <Box display="flex" flexWrap="wrap">
          <Box display="flex">
            <MdLocationOn color="green" size="1.5em" />
            <Text px="2">{data?.merchant_address}</Text>
          </Box>
          <Text hidden={isMobile} color="green" pr="3">
            |
          </Text>
          <MdPhoneInTalk color="green" size="1.5em" />
          <Text px="2">{data?.phone}</Text>
        </Box>
      </Box>
    </Box>
  );
}
