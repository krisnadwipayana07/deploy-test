import { useToast } from "@chakra-ui/react";

export default function ErrorHandler(err) {
  const toast = useToast();
  console.log(err);
  toast({
    title: "Error Fetching Data",
    description:
      "Terjadi kesalahan pada saat mengambil data, mohon coba lagi..",
    status: "error",
    isClosable: true,
  });
}
