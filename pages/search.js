import { Box, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MerchantCard from "../components/molecules/card/MerchantCard";
import Footer from "../components/organism/footer/Footer";
import Pagination from "../components/organism/pagination/Pagination";
import SectionSearchNav from "../components/sections/detail-wisata/SectionSearchNav";
import { getAllMerchants } from "../utils/api/MerchantApi";

export default function Search() {
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 800px)");

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [nameSearch, setNameSearch] = useState(router.query?.keyword);

  useEffect(() => {
    getAllMerchants({ page: page, keyword: nameSearch })
      .then((res) => {
        var tempData = res.data.data;
        setData({ ...tempData });
      })
      .catch((err) => ErrorHandler(err));
  }, [page]);

  const handlePage = (page) => {
    setPage(page);
  };
  const handleChangeName = (e) => {
    const { value } = e.target;
    setNameSearch(value);
  };
  return (
    <Box minH="100vh">
      <SectionSearchNav name={nameSearch} handleChange={handleChangeName} />

      <SimpleGrid
        w="full"
        py="5"
        px={isMobile ? "5" : "10"}
        columns={[2, 2, 3, 4]}
        spacing={5}
      >
        {data?.merchants?.map((item, key) => (
          <MerchantCard
            key={key}
            location={`${item.district} , ${item.province}`}
            name={item.merchant_name}
            price={0}
            img={
              "https://atixbali.oss-ap-southeast-5.aliyuncs.com/" +
              item.header_img
            }
            index={item.id}
          />
        ))}
      </SimpleGrid>
      {data?.merchants?.length === 0 && (
        <Text h="21vh" textAlign="center" fontWeight={600}>
          Maaf saat ini Destinasi yang anda cari tidak ada, mohon untuk
          menggunakan keyword yang lainnya
        </Text>
      )}
      <Box py="5">
        <Pagination
          totalPage={data?.metadata?.total_page}
          page={page}
          handlePage={handlePage}
        />
      </Box>
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
