import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles";
import { AppointmentsContext } from "../context/appointments";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import HomeAppointmentCard from "./HomeAppointmentCard";
import { View } from "react-native";

function HomeCalendar() {
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  console.log(selectedAppointments);

  markedDates = {};
  for (appt of appointments) {
    const date = appt.datetime.slice(0, 10);
    markedDates[date] = { marked: true };
    if (markedDates[date].appointments) {
      markedDates[date].appointments.push(appt);
    } else {
      markedDates[date].appointments = [appt];
    }
  }

  const apptsToDisplay = selectedAppointments
    .sort((a, b) => new Date(a.datetime + "Z") - new Date(b.datetime + "Z"))
    .map((appt) => <HomeAppointmentCard key={appt.id} appointment={appt} />);

  //date param is in the format YYYY-MM-DD
  function handleDayPress(date) {
    if (markedDates[date]) {
      setSelectedAppointments(markedDates[date].appointments);
    } else {
      setSelectedAppointments([]);
    }
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Calendar
        //Dates marked with appts
        markedDates={markedDates}
        onDayPress={(day) => handleDayPress(day.dateString)}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MMM yyyy"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          // console.log("month changed", month);
        }}
        firstDay={0}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        style={styles.calendar}
        theme={styles.calendarTheme}
      />
      {apptsToDisplay}
    </View>
  );
}

export default HomeCalendar;
