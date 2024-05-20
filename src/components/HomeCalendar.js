import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles";
import { AppointmentsContext } from "../context/appointments";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import HomeAppointmentCard from "./HomeAppointmentCard";
import { View } from "react-native";
import { Navigate } from "react-router-native";
import { Button, Text } from "react-native-paper";

function HomeCalendar({
  navigation,
  markedDates,
  setSelectedAppointments,
  selectedDay,
  setSelectedDay,
}) {
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
    </View>
  );
}

export default HomeCalendar;
