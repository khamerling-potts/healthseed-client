import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";

function Conditions() {
  const { user } = useContext(UserContext);
  const conditions = user.conditions.map((condition) => (
    <Text key={condition.id}>{condition.description}</Text>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the conditions page</Text>
      {conditions}
      <Link to="/">
        <Text style={styles.link}>Home</Text>
      </Link>
      <Link to="/profile">
        <Text style={styles.link}>Profile</Text>
      </Link>
    </SafeAreaView>
  );
}

export default Conditions;
