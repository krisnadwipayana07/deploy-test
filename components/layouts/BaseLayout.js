import { Box } from "@chakra-ui/react";
import React from "react";
import Footer from "../organism/footer/Footer";
import Navbar from "../organism/navbar/Navbar";

export default function BaseLayout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box bgColor="#F2F2F2" minH="76.7vh">
        <main>{children}</main>
      </Box>
      <Footer />
    </Box>
  );
}
