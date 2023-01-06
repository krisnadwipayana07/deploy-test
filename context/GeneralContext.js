import { createContext, useContext, useState } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [listTicket, setListTicket] = useState([]);
  const [merchantDetail, setMerchantDetail] = useState("");

  const value = {
    listTicket,
    setListTicket,
    merchantDetail,
    setMerchantDetail,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GeneralContext);

export default GeneralContextProvider;
