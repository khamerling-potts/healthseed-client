import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native-paper";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";
import LoginForm from "../components/LoginForm";
import { MedicationsContext } from "../context/medications";
import { InstructionsContext } from "../context/instructions";
import { ConditionsContext } from "../context/conditions";
import { ProvidersContext } from "../context/providers";
import { AppointmentsContext } from "../context/appointments";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { ScrollView } from "react-native";

function HomeCalendar() {
  const { appointments, setAppointments } = useContext(AppointmentsContext);

  markedDates = {};
  for (appt of appointments) {
    markedDates[appt.datetime.slice(0, 10)] = { marked: true, color: "green" };
  }

  return (
    <Calendar
      // Initially visible month. Default = now
      initialDate={new Date().toDateString()}
      //Dates marked with appts
      markedDates={markedDates}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {
        // console.log("selected day", day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"MMM yyyy"}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {
        // console.log("month changed", month);
      }}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={false}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={0}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
      style={{
        borderWidth: 1,
        borderColor: "gray",
      }}
      //   theme={{
      //     backgroundColor: "#ffffff",
      //     calendarBackground: "#ffffff",
      //     textSectionTitleColor: "#b6c1cd",
      //     selectedDayBackgroundColor: "#00adf5",
      //     selectedDayTextColor: "#ffffff",
      //     todayTextColor: "#00adf5",
      //     dayTextColor: "#2d4150",
      //   }}
    />
  );
}

export default HomeCalendar;
