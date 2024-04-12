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
          <BottomNav />
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
