import React, { useContext, useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
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

//Each navigation screen is automatically passed the navigation prop
function Home({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const { medications, setMedications } = useContext(MedicationsContext);
  const { instructions, setInstructions } = useContext(InstructionsContext);
  const { conditions, setConditions } = useContext(ConditionsContext);
  const { providers, setProviders } = useContext(ProvidersContext);
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { routines, setRoutines } = useContext(RoutinesContext);

  // Setting global contexts
  useEffect(() => {
    fetch("http://127.0.0.1:5555/medications").then((r) => {
      if (r.ok) {
        r.json().then((medications) => setMedications(medications));
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/instructions").then((r) => {
      if (r.ok) {
        r.json().then((instructions) => setInstructions(instructions));
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/conditions").then((r) => {
      if (r.ok) {
        r.json().then((conditions) => setConditions(conditions));
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/providers").then((r) => {
      if (r.ok) {
        r.json().then((providers) => setProviders(providers));
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/appointments").then((r) => {
      if (r.ok) {
        r.json().then((appointments) => setAppointments(appointments));
      } else {
        r.json().then((err) => console.log(err));
      }
    });

    fetch("http://127.0.0.1:5555/routines").then((r) => {
      if (r.ok) {
        r.json().then((routines) => setRoutines(routines));
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.homeScrollView}>
        <HomeCalendar navigation={navigation} />
        <Divider />

        {/* Display number of routines and up to 3 routine titles for each time category */}
        <View style={styles.homeRoutines}>
          <Text variant="titleLarge">{`${morningRoutines.length} morning routine(s)`}</Text>
          {morningRoutines.length ? (
            <Text>{`Including ${afternoonRoutines
              .slice(0, 4)
              .join(", ")}...`}</Text>
          ) : null}

          <Text variant="titleLarge">{`${afternoonRoutines.length} afternoon routine(s)`}</Text>
          {afternoonRoutines.length ? (
            <Text>{`Including ${afternoonRoutines
              .slice(0, 4)
              .join(", ")}...`}</Text>
          ) : null}

          <Text variant="titleLarge">{`${eveningRoutines.length} evening routine(s)`}</Text>
          {eveningRoutines.length ? (
            <Text>{`Including ${eveningRoutines
              .slice(0, 4)
              .join(", ")}...`}</Text>
          ) : null}

          <Text variant="titleLarge">
            {`${anytimeRoutines.length} routine(s) to complete at any time`}
          </Text>
          {anytimeRoutines.length ? (
            <Text>{`Including ${anytimeRoutines
              .slice(0, 4)
              .join(", ")}...`}</Text>
          ) : null}
        </View>

        <Button onPress={() => navigation.navigate("Routines")}>
          See All Routines
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
