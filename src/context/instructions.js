import { createContext, useState } from "react";

const InstructionsContext = createContext();

function InstructionsProvider({ children }) {
  const [instructions, setInstructions] = useState([]);
  const fetchInstructions = () => {
    fetch(
      "https://healthseed-flask-backend-94c8efc27481.herokuapp.com/instructions"
    ).then((r) => {
      if (r.ok) {
        r.json().then((instructions) => {
          console.log("instructions setting");

          setInstructions(instructions);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  };
  return (
    <InstructionsContext.Provider
      value={{ instructions, setInstructions, fetchInstructions }}
    >
      {children}
    </InstructionsContext.Provider>
  );
}

export { InstructionsContext, InstructionsProvider };
