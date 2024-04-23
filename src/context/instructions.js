import { createContext, useState } from "react";

const InstructionsContext = createContext();

function InstructionsProvider({ children }) {
  const [instructions, setInstructions] = useState([]);
  return (
    <InstructionsContext.Provider value={{ instructions, setInstructions }}>
      {children}
    </InstructionsContext.Provider>
  );
}

export { InstructionsContext, InstructionsProvider };
