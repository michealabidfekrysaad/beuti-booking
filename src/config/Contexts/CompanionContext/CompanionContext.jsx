import { createContext, useState } from "react";

export const CompanionContext = createContext();
export const companion = {
  id: Math.trunc(Math.random() * 200) + 1,
  name: "Me",
  checked: true,
};

const CompanionProvider = ({ children }) => {
  const [companions, setCompanions] = useState([companion]);

  return (
    <CompanionContext.Provider value={{ companions, setCompanions }}>
      {children}
    </CompanionContext.Provider>
  );
};

export default CompanionProvider;
