import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";
import BaseLayout from "../../components/layouts/BaseLayout";

export default function qris() {
  return (
    <SimpleGrid columns={2} py="10" px="20" spacing={10}>
      <Box bgColor="white" borderRadius="10px" p="10">
        <Box display="inline-block" m="5">
          <Image
            src="/assets/qris/logo.png"
            alt="shape1"
            width="1000em"
            height="100%"
            objectFit="contain"
          />
          <Box display="flex" pt="3">
            <Box px="10" pt="20" pb="10" pos="relative">
              <Image
                width="10%"
                height="100%"
                objectFit="contain"
                src="/assets/qris/shape1.png"
                alt="shape1"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                }}
              />
              <Image
                width="100%"
                height="100%"
                objectFit="contain"
                src="/assets/qris/shape2.png"
                alt="shape2"
                style={{
                  position: "absolute",
                  bottom: "0px",
                  right: "0px",
                }}
              />
              <Text
                position="absolute"
                bottom="0"
                textAlign="center"
                color="gray"
                width="100%"
                height="100%"
                fontSize="13"
                pb="2"
              >
                Dicetak Oleh: Krisna
              </Text>
              <QRCode
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value="test"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box bgColor="white" borderRadius="10px" p="10"></Box>
    </SimpleGrid>
  );
}

qris.getLayout = (page) => <BaseLayout>{page} </BaseLayout>;
