import { createContext, useState } from "react";

const RoutinesContext = createContext();

function RoutinesProvider({ children }) {
  const [routines, setRoutines] = useState([]);
  return (
    <RoutinesContext.Provider value={{ routines, setRoutines }}>
      {children}
    </RoutinesContext.Provider>
  );
}

export { RoutinesContext, RoutinesProvider };
