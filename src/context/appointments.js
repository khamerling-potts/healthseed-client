import { createContext, useState } from "react";

const AppointmentsContext = createContext();

function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  function fetchAppointments() {
    fetch(
      "https://healthseed-flask-backend-94c8efc27481.herokuapp.com/appointments"
    ).then((r) => {
      if (r.ok) {
        r.json().then((appointments) => {
          setAppointments(appointments);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }
  return (
    <AppointmentsContext.Provider
      value={{ appointments, setAppointments, fetchAppointments }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export { AppointmentsContext, AppointmentsProvider };
