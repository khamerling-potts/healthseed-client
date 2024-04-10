import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import RoutesComponent from "./routes";
import styles from "./styles";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import { UserContext, UserProvider } from "./src/context/user";
import LoginForm from "./src/components/LoginForm";

export default function App() {
  // const { user, setUser } = useContext(UserContext);

  return (
    <NativeRouter>
      <UserProvider>
        <RoutesComponent />
      </UserProvider>
    </NativeRouter>
  );
}
