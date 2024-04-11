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
import BottomNav from "./src/components/BottomNav";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppWrapper from "./src/components/AppWrapper";

export default function App() {
  // const { user, setUser } = useContext(UserContext);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeRouter>
          <UserProvider>
            <AppWrapper />
          </UserProvider>
        </NativeRouter>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
