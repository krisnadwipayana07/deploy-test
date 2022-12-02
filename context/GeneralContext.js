import { createContext, useState } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [listTicket, setListTicket] = useState([]);

  const value = {
    listTicket,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
