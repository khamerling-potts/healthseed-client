import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles";
import { AppointmentsContext } from "../context/appointments";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import HomeAppointmentCard from "./HomeAppointmentCard";
import { View } from "react-native";
import { Navigate } from "react-router-native";
import { Button } from "react-native-paper";

function HomeCalendar({ navigation }) {
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().slice(0, 10)
  );

  markedDates = {};
  for (appt of appointments) {
    const date = appt.datetime.slice(0, 10);
    if (markedDates[date]) {
      markedDates[date].appointments.push(appt);
    } else {
      markedDates[date] = { marked: true };
      markedDates[date].appointments = [appt];
    }
  }
  console.log(markedDates);

  const apptsToDisplay = selectedAppointments
    .sort((a, b) => new Date(a.datetime + "Z") - new Date(b.datetime + "Z"))
    .map((appt) => <HomeAppointmentCard key={appt.id} appointment={appt} />);

  //date param is in the format YYYY-MM-DD
  function handleDayPress(date) {
    setSelectedDay(date);
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
        markedDates={{
          ...markedDates,
          [selectedDay]: {
            ...markedDates[selectedDay],
            selected: true,
          },
        }}
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
      {apptsToDisplay[0]}
      {selectedAppointments.length > 1 ? (
        <Button onPress={() => navigation.navigate("Appointments")}>
          +{selectedAppointments.length - 1} more
        </Button>
      ) : (
        <Button onPress={() => navigation.navigate("Appointments")}>
          See All
        </Button>
      )}
    </View>
  );
}

export default HomeCalendar;
