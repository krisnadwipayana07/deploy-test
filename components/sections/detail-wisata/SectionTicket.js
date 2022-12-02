import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IDRConvert } from "../../../utils/tools/IDRConvert";
import InputForm from "../../atoms/form/InputForm";
import TiketCard from "../../molecules/card/TiketCard";
import Pagination from "../../organism/pagination/Pagination";
import ModalTicket from "../../organism/ticket/ModalTicket";
import TicketData from "./SectionTiketDummy.json";

export default function SectionTicket({ tixData }) {
  const limit = 5,
    country = ["Indonesia", "England", "American", "Thailand"];
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [data, setData] = useState(tixData);
  const [detailData, setDetailData] = useState({
    boys: 0,
    girl: 0,
    country: "Indonesia",
  });

  let total = 0;
  data?.map((item) => {
    total =
      total + item.adult_price * item.adult + item.child_price * item.child;
  });
  // const allEmpty = data.every((item) => item.qty === 0);

  //handle if tix first render return null
  useEffect(() => {
    setData(
      tixData?.map((value) => {
        const tempData = { ...value, adult: 0, child: 0 };
        return tempData;
      })
    );
  }, [tixData]);

  const handlePage = (page) => {
    setPage(page);
  };
  const handleChangeDetail = (e) => {
    const { name, value } = e.target;
    setDetailData({ ...data, [name]: value });
  };

  const handleBil = () => {
    console.log(data);
    console.log(detailData);
    window.loc;
  };

  // console log at here - delete if distrubing
  // console.log((page - 1) * limit, page * limit);

  return (
    <Box p="10" id="tiket">
      <Box display="flex">
        <Box
          borderRadius="20px"
          bgColor="#DCFCE7"
          color="#22C55E"
          px="2"
          fontWeight={500}
        >
          {t("detail.tickets")}
        </Box>
      </Box>
      <Text py="5" fontWeight={600} fontSize="24px">
        {t("detail.tix-header")}
      </Text>
      <Box p="5" boxShadow="xl" border="2px solid #E7E7E7" borderRadius="10px">
        {data?.slice((page - 1) * limit, page * limit).map((item, key) => (
          <ModalTicket
            key={key}
            data={item}
            setData={setData}
            allData={data}
            index={key}
          />
        ))}
        <Pagination
          totalPage={Math.ceil(data?.length / limit)}
          handlePage={handlePage}
          page={page}
        />
        <Grid templateColumns="repeat(3, 1fr)" py="5">
          <GridItem colSpan={2} display="flex">
            {openDetail && (
              <>
                <InputForm
                  name={t("detail.tix-form.form-1")}
                  id="boys"
                  handleChange={handleChangeDetail}
                  value={detailData.boys}
                />
                <InputForm
                  name={t("detail.tix-form.form-2")}
                  id="girl"
                  handleChange={handleChangeDetail}
                  value={detailData.girl}
                />
                <GridItem display="flex" alignItems="center">
                  <Text fontWeight={700} fontSize="16px">
                    {t("detail.tix-form.form-3")}
                  </Text>
                  <Select
                    px="2"
                    name="country"
                    value={detailData.country}
                    onChange={handleChangeDetail}
                  >
                    {country.map((value, key) => (
                      <option key={key} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </GridItem>
              </>
            )}
            <Button variant="ghost" onClick={() => setOpenDetail(!openDetail)}>
              {openDetail ? <ViewOffIcon /> : <ViewIcon />}
              <Text pl="2" hidden={openDetail}>
                {t("detail.tix-form.title")}
              </Text>
            </Button>
          </GridItem>
          <GridItem display="flex" justifyContent="end" pr="5">
            <Text pr="2" fontWeight={600} fontSize="24px">
              Total :
            </Text>
            <Text fontWeight={600} fontSize="24px" color="#3D734D">
              {IDRConvert.format(total)}
            </Text>
          </GridItem>
        </Grid>
        <Box display="flex" justifyContent="end">
          <Link href={{ pathname: "/payment/detail", query: { data } }}>
            <Button
              // disabled={allEmpty}
              w="20%"
              colorScheme="green"
            >
              {t("detail.tix-form.button")}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
