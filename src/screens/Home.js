import React, { useContext, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Divider, Icon, Surface, Text } from "react-native-paper";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";
import LoginForm from "../components/LoginForm";
import { MedicationsContext } from "../context/medications";
import { InstructionsContext } from "../context/instructions";
import { ConditionsContext } from "../context/conditions";
import { ProvidersContext } from "../context/providers";
import { AppointmentsContext } from "../context/appointments";
import HomeCalendar from "../components/HomeCalendar";
import { RoutinesContext } from "../context/routines";
import HomeRoutinePreview from "../components/HomeRoutinePreview";
import HomeAppointmentCard from "../components/HomeAppointmentCard";

//Each navigation screen is automatically passed the navigation prop
function Home({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const { medications, setMedications } = useContext(MedicationsContext);
  const { instructions, setInstructions } = useContext(InstructionsContext);
  const { conditions, setConditions } = useContext(ConditionsContext);
  const { providers, setProviders } = useContext(ProvidersContext);
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { routines, setRoutines } = useContext(RoutinesContext);

  // States that indicate whether or not the global contexts are still loading
  const [medicationsLoading, setMedicationsLoading] = useState(true);
  const [instructionsLoading, setInstructionsLoading] = useState(true);
  const [conditionsLoading, setConditionsLoading] = useState(true);
  const [providersLoading, setProvidersLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [routinesLoading, setRoutinesLoading] = useState(true);

  const today = new Date().toISOString().slice(0, 10);

  let markedDates = markDates();
  function markDates() {
    let marked = {};
    for (appt of appointments) {
      const date = appt.datetime.slice(0, 10);
      if (marked[date]) {
        marked[date].appointments.push(appt);
      } else {
        marked[date] = { marked: true };
        marked[date].appointments = [appt];
      }
    }
    return { ...marked };
  }
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const [selectedDay, setSelectedDay] = useState(today);

  useEffect(() => {
    if (markedDates[today]) {
      setSelectedAppointments(markedDates[today].appointments);
    }
  }, [appointments]);

  const apptsToDisplay = selectedAppointments
    .sort((a, b) => new Date(a.datetime + "Z") - new Date(b.datetime + "Z"))
    .map((appt) => <HomeAppointmentCard key={appt.id} appointment={appt} />);

  // Setting global contexts
  useEffect(() => {
    fetch("http://127.0.0.1:5555/medications").then((r) => {
      if (r.ok) {
        r.json().then((medications) => {
          setMedications(medications);
          setMedicationsLoading(false);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/instructions").then((r) => {
      if (r.ok) {
        r.json().then((instructions) => {
          setInstructions(instructions);
          setInstructionsLoading(false);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/conditions").then((r) => {
      if (r.ok) {
        r.json().then((conditions) => {
          setConditions(conditions);
          setConditionsLoading(false);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/providers").then((r) => {
      if (r.ok) {
        r.json().then((providers) => {
          setProviders(providers);
          setProvidersLoading(false);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/appointments").then((r) => {
      if (r.ok) {
        r.json().then((appointments) => {
          setAppointments(appointments);
          setAppointmentsLoading(false);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/routines").then((r) => {
      if (r.ok) {
        r.json().then((routines) => {
          setRoutines(routines);
          setRoutinesLoading(false);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  //Filter morning, afternoon, evening, and any-time routines
  const morningRoutines = routines
    .filter((routine) => routine.times.includes("morning"))
    .map((routine) => routine.title);
  const afternoonRoutines = routines
    .filter((routine) => routine.times.includes("afternoon"))
    .map((routine) => routine.title);
  const eveningRoutines = routines
    .filter((routine) => routine.times.includes("evening"))
    .map((routine) => routine.title);
  const anytimeRoutines = routines
    .filter((routine) => routine.times.includes("any time"))
    .map((routine) => routine.title);

  return (
    <SafeAreaView style={{ ...styles.container, justifyContent: "center" }}>
      {medicationsLoading ||
      instructionsLoading ||
      conditionsLoading ||
      providersLoading ||
      appointmentsLoading ||
      routinesLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          style={styles.homeScrollView}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <HomeCalendar
            navigation={navigation}
            markedDates={markedDates}
            setSelectedAppointments={setSelectedAppointments}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          <View style={styles.homeHeaderView}>
            {selectedAppointments.length === 0 ? (
              <Text style={{ fontWeight: "bold", color: "#737373" }}>
                No appointments on {selectedDay}
              </Text>
            ) : (
              <Text style={{ fontWeight: "bold", color: "#597683" }}>
                Appointments ({selectedDay})
              </Text>
            )}
            {selectedAppointments.length > 1 ? (
              <Button
                onPress={() => navigation.navigate("Appointments")}
                textColor="#006A6A"
                style={styles.homePageButton}
              >
                +{selectedAppointments.length - 1} more
              </Button>
            ) : (
              <Button
                style={styles.homePageButton}
                onPress={() => navigation.navigate("Appointments")}
                textColor="#006A6A"
              >
                See All
              </Button>
            )}
          </View>
          {apptsToDisplay[0]}

          <Divider style={styles.divider} />

          {/* Display number of routines and up to 3 routine titles for each time category */}
          <View style={styles.homeHeaderView}>
            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", color: "#597683" }}
            >
              Your Routines - Overview
            </Text>
            <Button
              onPress={() => navigation.navigate("Routines")}
              style={styles.homePageButton}
              textColor="#006A6A"
            >
              See All
            </Button>
          </View>

          <View style={styles.homeRoutines}>
            <HomeRoutinePreview routines={morningRoutines} time="morning" />
            <HomeRoutinePreview routines={afternoonRoutines} time="afternoon" />
            <HomeRoutinePreview routines={eveningRoutines} time="evening" />
            <HomeRoutinePreview routines={anytimeRoutines} time="any time" />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default Home;
