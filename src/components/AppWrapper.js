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
import { AppointmentsContext } from "../context/appointments";

function AppWrapper() {
  const { user, setUser } = useContext(UserContext);

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
