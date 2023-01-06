import { Box, useMediaQuery, useToast } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Footer from "../../components/organism/footer/Footer";
import SectionDeskripsi from "../../components/sections/detail-wisata/SectionDeskripsi";
import SectionLocation from "../../components/sections/detail-wisata/SectionLocation";
import SectionSearchNav from "../../components/sections/detail-wisata/SectionSearchNav";
import SectionTicket from "../../components/sections/detail-wisata/SectionTicket";
import SectionWisata from "../../components/sections/detail-wisata/SectionWisata";
import { GeneralContext } from "../../context/GeneralContext";
import { getMerchantsDetail } from "../../utils/api/MerchantApi";

export default function DetailWisata() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [isMobile] = useMediaQuery("(max-width: 800px)");
  const { setMerchantDetail } = useContext(GeneralContext);

  const [data, setData] = useState();
  const [nameSearch, setNameSearch] = useState(data?.merchant_name);

  //console.log here - delete if distrubing
  console.log(data);

  useEffect(() => {
    getMerchantsDetail(id)
      .then((res) => {
        const data = res.data.data;
        setData(data);
        setMerchantDetail({
          id: data.id,
          name: data.merchant_name,
          img:
            "https://atixbali.oss-ap-southeast-5.aliyuncs.com/" +
            data?.header_img,
        });
      })
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

  const handleChangeName = (e) => {
    setNameSearch(e.target.value);
  };

  return (
    <Box>
      <SectionSearchNav name={nameSearch} handleChange={handleChangeName} />
      <Box px={isMobile ? "5" : "20"}>
        <SectionWisata data={data} isMobile={isMobile} />
        <SectionDeskripsi
          data={data}
          listTicket={data?.tickets}
          isMobile={isMobile}
        />
      </Box>
      <SectionLocation
        name={data?.merchant_name}
        latitude={data?.latitude}
        longitude={data?.longitude}
      />
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
