import React, { useContext } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { Link, useNavigate } from "react-router-native";
import styles from "../../styles";
import { UserContext } from "../context/user";
import BottomNav from "../components/BottomNav";
import { createStackNavigator } from "@react-navigation/stack";

function Providers() {
  const Stack = createStackNavigator();

  const { user, setUser } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the Providers screen</Text>
      <BottomNav />
    </SafeAreaView>
  );
}

export default Providers;
