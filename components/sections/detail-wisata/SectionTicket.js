import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Select,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/GeneralContext";
import { getAllContries } from "../../../utils/api/UserApi";
import { IDRConvert } from "../../../utils/tools/IDRConvert";
import InputForm from "../../atoms/form/InputForm";
import LoginConfirmation from "../../organism/modal/LoginConfirmation";
import Pagination from "../../organism/pagination/Pagination";
import ModalTicket from "../../organism/ticket/ModalTicket";

export default function SectionTicket({ tixData }) {
  const limit = 5;
  const country = ["Indonesia", "England", "American", "Thailand"];
  const { t } = useTranslation();
  const { listTicket, setListTicket } = useGlobalContext();
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 800px)");

  const [page, setPage] = useState(1);
  const [isLogin, setIsLogin] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [data, setData] = useState(tixData);
  const [allContry, setAllContry] = useState();
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
  const allEmpty = data?.every((item) => item.child === 0 && item.adult === 0);

  //check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
    getAllContries()
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);
  //handle if tix first render return null
  useEffect(() => {
    setData(
      tixData?.map((value) => {
        const tempData = { ...value, adult: 0, child: 0 };
        return tempData;
      })
    );
  }, [tixData]);
  useEffect(() => {
    setListTicket(data);
  }, [data]);

  const handleOpen = () => {
    if (!isLogin) {
      setCheckLogin(true);
    } else {
      router.push("/payment/detail");
    }
  };
  const handleClose = () => {
    setCheckLogin(false);
  };
  const handlePage = (page) => {
    setPage(page);
  };
  const handleChangeDetail = (e) => {
    const { name, value } = e.target;
    setDetailData({ ...data, [name]: value });
  };

  // console log at here - delete if distrubing
  // console.log((page - 1) * limit, page * limit);
  console.log(listTicket);

  return (
    <Box p={isMobile ? "5" : "10"} id="tiket">
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
        <Grid
          templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
          py="5"
        >
          <GridItem colSpan={isMobile ? 1 : 2} display="flex" flexWrap="wrap">
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
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "md"}
              onClick={() => setOpenDetail(!openDetail)}
            >
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
          <Button
            disabled={allEmpty}
            w={isMobile ? "100%" : "20%"}
            colorScheme="green"
            onClick={handleOpen}
          >
            {t("detail.tix-form.button")}
          </Button>
        </Box>
      </Box>
      <LoginConfirmation open={checkLogin} handleClose={handleClose} />
    </Box>
  );
}
