import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
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

function Home() {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.homeScrollView}>
        <HomeCalendar />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
