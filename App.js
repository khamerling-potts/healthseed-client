import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import RoutesComponent from "./routes";
import styles from "./styles";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import { UserProvider } from "./src/context/user";

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Link to="/">
          <Text style={styles.link}>Home</Text>
        </Link>
        <Link to="/profile">
          <Text style={styles.link}>Profile</Text>
        </Link>
        <UserProvider>
          <RoutesComponent />
        </UserProvider>
      </View>
    </NativeRouter>
  );
}
