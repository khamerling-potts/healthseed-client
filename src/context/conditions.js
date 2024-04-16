import { createContext, useState } from "react";

const ConditionsContext = createContext();

function ConditionsProvider({ children }) {
  const [conditions, setConditions] = useState([]);
  return (
    <ConditionsContext.Provider value={{ conditions, setConditions }}>
      {children}
    </ConditionsContext.Provider>
  );
}

export { ConditionsContext, ConditionsProvider };
