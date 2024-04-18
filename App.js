import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
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
import { PaperProvider } from "react-native-paper";
import { ConditionsProvider } from "./src/context/conditions";
import { ProvidersProvider } from "./src/context/providers";
import { MedicationsProvider } from "./src/context/medications";

export default function App() {
  // const { user, setUser } = useContext(UserContext);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <NativeRouter> */}
          <UserProvider>
            <ConditionsProvider>
              <ProvidersProvider>
                <MedicationsProvider>
                  <AppWrapper />
                </MedicationsProvider>
              </ProvidersProvider>
            </ConditionsProvider>
          </UserProvider>
          {/* </NativeRouter> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
