import { createContext, useState } from "react";

const MedicationsContext = createContext();

function MedicationsProvider({ children }) {
  const [medications, setMedications] = useState([]);
  return (
    <MedicationsContext.Provider value={{ medications, setMedications }}>
      {children}
    </MedicationsContext.Provider>
  );
}

export { MedicationsContext, MedicationsProvider };
