import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Footer from "../components/organism/footer/Footer";
import Section1 from "../components/sections/homepage/Section1";
import Section2 from "../components/sections/homepage/Section2";
import Section3 from "../components/sections/homepage/Section3";
import { getMerchantTop } from "../utils/api/MerchantApi";
import ErrorHandler from "../utils/tools/ErrorHandler";

export default function Home() {
  const [topMerchant, setTopMerchant] = useState([]);
  const [allMerchants, setAllMerchants] = useState([]);

  useEffect(() => {
    getMerchantTop()
      .then((res) => {
        if (res.status === 200) {
          setTopMerchant(res.data.data?.merchants);
        }
      })
      .catch((err) => ErrorHandler(err));
  }, []);

  return (
    <>
      <Section1 />
      <Section2 topMerchant={topMerchant} />
      <Section3 />
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
