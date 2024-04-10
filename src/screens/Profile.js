import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Link } from "react-router-native";
import styles from "../../styles";

function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <Link to="/">
        <Text style={styles.link}>Home</Text>
      </Link>
      <Link to="/conditions">
        <Text style={styles.link}>Conditions</Text>
      </Link>
      <Text>This is the Profile screen</Text>
    </SafeAreaView>
  );
}

export default Profile;
