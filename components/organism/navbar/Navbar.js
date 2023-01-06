import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function Navbar() {
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 800px)");
  const { locales, locale, pathname, query, asPath } = router;

  const [langValue, setLangValue] = useState(locale === "en" ? "EN" : "ID");
  const [token, setToken] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setName(localStorage.getItem("name"));
  }, []);

  const handleChange = (lang) => {
    setLangValue(lang);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/");
  };

  return (
    <SimpleGrid columns={2} px={isMobile ? "1" : "5"} py="2" bg="transparent">
      <Link href="/">
        <Box display="flex" alignItems="center" gap={2}>
          <Image
            src="/assets/logo/atix.png"
            alt="atix"
            height={50}
            width={100}
            objectFit="contain"
          />
          <Image src="/assets/logo/bpd.png" alt="BPD" height={30} width={30} />
        </Box>
      </Link>
      <Box display="flex" justifyContent="end" gap={2}>
        {token ? (
          <Menu>
            <MenuButton
              color="green"
              as={Button}
              bgColor="transparent"
              leftIcon={<FaUserCircle />}
            >
              <Text overflow="hidden">{name}</Text>
            </MenuButton>
            <MenuList minW="10">
              <Link href="/profile">
                <MenuItem>
                  Profile
                  <Box pl="3">
                    <FaUserCircle />
                  </Box>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                Logout
                <Box pl="2">
                  <MdLogout />
                </Box>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" color="green">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button colorScheme="green">Register</Button>
            </Link>
          </>
        )}

        <Menu>
          <MenuButton as={Button} bgColor="transparent">
            <Box display="flex" alignContent="center">
              <Box pr="1">
                <Image
                  width={isMobile ? "30%" : "10%"}
                  height={isMobile ? "30%" : "10%"}
                  objectFit="cover"
                  src={
                    langValue === "ID"
                      ? "/assets/flag/id.png"
                      : "/assets/flag/en.webp"
                  }
                  alt="ID"
                />
              </Box>
              {langValue}
            </Box>
          </MenuButton>
          <MenuList minW="10" w="20">
            <Link href={{ pathname, query }} as={asPath} locale="id">
              <MenuItem onClick={() => handleChange("ID")}>
                <Box display="flex" alignContent="center">
                  <Box pr="1">
                    <Image
                      width="20px"
                      height="10px"
                      src="/assets/flag/id.png"
                      alt="ID"
                    />
                  </Box>
                  ID
                </Box>
              </MenuItem>
            </Link>
            <Link href={{ pathname, query }} as={asPath} locale="en">
              <MenuItem onClick={() => handleChange("EN")}>
                <Box display="flex" alignContent="center">
                  <Box pr="1">
                    <Image
                      width="20px"
                      height="10px"
                      src="/assets/flag/en.webp"
                      alt="ID"
                    />
                  </Box>
                  EN
                </Box>
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </SimpleGrid>
  );
}
