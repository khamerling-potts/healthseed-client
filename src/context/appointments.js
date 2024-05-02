import { createContext, useState } from "react";

const AppointmentsContext = createContext();

function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  return (
    <AppointmentsContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export { AppointmentsContext, AppointmentsProvider };
