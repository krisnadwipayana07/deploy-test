import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import Tag from "../../atoms/Tag";
import MapsGoogle from "../../molecules/maps/MapsGoogle";

export default function SectionLocation({ latitude, longitude, name }) {
  const { t } = useTranslation();
  const [hidden, setHidden] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    if (latitude === 0 && longitude === 0) {
      setHidden(true);
    }
  }, [latitude, longitude]);

  const data = {
    name: name,
    lat: latitude,
    lng: longitude,
  };

  return (
    <Box hidden={hidden} bgColor="#F7F8F9" p={isMobile ? "5" : "20"}>
      <Tag>{t("detail.location")} </Tag>
      <Text py="2" fontWeight={600} fontSize="24px">
        {t("detail.loc-header")}
      </Text>
      <Box w="full">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB_k-58yMIFGQVYhNf7dyHjDJbFg8zpxv8
          &q=${data?.name}
          &center=${data?.lat},${data?.lng}
          &zoom=18&maptype=satellite`}
          width="100%"
          height="400vh"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
}
