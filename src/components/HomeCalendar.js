import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles";
import { AppointmentsContext } from "../context/appointments";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

function HomeCalendar() {
  const { appointments, setAppointments } = useContext(AppointmentsContext);

  markedDates = {};
  for (appt of appointments) {
    markedDates[appt.datetime.slice(0, 10)] = { marked: true, color: "green" };
  }

  return (
    <Calendar
      //Dates marked with appts
      markedDates={markedDates}
      onDayPress={(day) => {
        // console.log("selected day", day);
      }}
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
  );
}

export default HomeCalendar;
