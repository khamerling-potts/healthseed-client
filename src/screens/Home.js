import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";
import LoginForm from "../components/LoginForm";
// import BottomNav from "../components/BottomNav";
// import RoutesComponent from "../../routes";

function Home() {
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>This is the Home screen</Text>
    </View>
  );
}

export default Home;
