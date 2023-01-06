import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import GeneralContextProvider from "../context/GeneralContext";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const theme = extendTheme({
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
    colors: {
      green: {
        50: "#EEF6F3",
        100: "#D1E6DD",
        200: "#B3D6C7",
        300: "#95C6B1",
        400: "#77B69C",
        500: "#59A686",
        600: "#47856B",
        700: "#356450",
        800: "#244235",
        900: "#12211B",
      },
    },
  });

  return (
    <>
      <Head>
        <title>ATIX Bali</title>
      </Head>
      <GeneralContextProvider>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </GeneralContextProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
