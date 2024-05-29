import { createContext, useState } from "react";

const RoutinesContext = createContext();

function RoutinesProvider({ children }) {
  const [routines, setRoutines] = useState([]);
  const fetchRoutines = () => {
    fetch(
      "https://healthseed-flask-backend-94c8efc27481.herokuapp.com/routines"
    ).then((r) => {
      if (r.ok) {
        r.json().then((routines) => {
          console.log("routines setting");

          setRoutines(routines);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  };
  return (
    <RoutinesContext.Provider value={{ routines, setRoutines, fetchRoutines }}>
      {children}
    </RoutinesContext.Provider>
  );
}

export { RoutinesContext, RoutinesProvider };
