import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { getAllMerchants } from "../../../utils/api/MerchantApi";
import MerchantCard from "../../molecules/card/MerchantCard";
import Pagination from "../../organism/pagination/Pagination";

export default function Section3() {
  const { t } = useTranslation("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllMerchants({ page: page })
      .then((res) => {
        var tempData = res.data.data;
        setData({ ...tempData });
      })
      .catch((err) => ErrorHandler(err));
  }, [page]);

  const handlePage = (page) => {
    setPage(page);
  };

  //console.log at here - delete if distrubing
  console.log(data);
  return (
    <Box px="10">
      <Text fontWeight={700} fontSize="34px">
        {t("home.sale")}
      </Text>

      <SimpleGrid w="full" py="5" px="10" columns={[1, 1, 3, 4, 5]} spacing={5}>
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
      <Box py="5">
        <Pagination
          totalPage={data?.metadata?.total_page}
          page={page}
          handlePage={handlePage}
        />
      </Box>
    </Box>
  );
}
