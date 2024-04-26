import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";
import LoginForm from "../components/LoginForm";
import Home from "../screens/Home";
import BottomNav from "../components/BottomNav";
import RoutesComponent from "../../routes";
import SignUpForm from "./SignUpForm";
import SideNav from "./SideNav";
import { createStackNavigator } from "@react-navigation/stack";
import { MedicationsContext } from "../context/medications";
import { InstructionsContext } from "../context/instructions";
import { ConditionsContext } from "../context/conditions";
import { ProvidersContext } from "../context/providers";

function AppWrapper() {
  const { user, setUser } = useContext(UserContext);
  const { medications, setMedications } = useContext(MedicationsContext);
  const { instructions, setInstructions } = useContext(InstructionsContext);
  const { conditions, setConditions } = useContext(ConditionsContext);
  const { providers, setProviders } = useContext(ProvidersContext);
  const Stack = createStackNavigator();

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
  }, []);

  return (
    <>
      {user ? (
        <>
          {/* uncomment below if you want react router back */}
          {/* <View style={styles.container}>
            <RoutesComponent />
          </View> */}
          <SideNav />

          {/* <BottomNav /> */}
        </>
      ) : (
        <>
          <LoginForm />
          <SignUpForm />
        </>
      )}
    </>
  );
}

export default AppWrapper;
