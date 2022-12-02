import { Box, useToast } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/organism/footer/Footer";
import SectionDeskripsi from "../../components/sections/detail-wisata/SectionDeskripsi";
import SectionLocation from "../../components/sections/detail-wisata/SectionLocation";
import SectionSearchNav from "../../components/sections/detail-wisata/SectionSearchNav";
import SectionTicket from "../../components/sections/detail-wisata/SectionTicket";
import SectionWisata from "../../components/sections/detail-wisata/SectionWisata";
import { getMerchantsDetail } from "../../utils/api/MerchantApi";

export default function DetailWisata() {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  const [data, setData] = useState();

  //console.log here - delete if distrubing
  console.log(data);

  useEffect(() => {
    getMerchantsDetail(id)
      .then((res) => setData(res.data.data))
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error Fetching Data",
          description:
            "Terjadi kesalahan pada saat mengambil data, mohon coba lagi..",
          status: "error",
          isClosable: true,
        });
      });
  }, []);

  return (
    <Box>
      <SectionSearchNav name={data?.merchant_name} />
      <Box px="20">
        <SectionWisata data={data} />
        <SectionDeskripsi data={data} />
      </Box>
      <SectionLocation latitude={data?.latitude} longitude={data?.longitude} />
      <SectionTicket tixData={data?.tickets} />
      <Footer />
    </Box>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
