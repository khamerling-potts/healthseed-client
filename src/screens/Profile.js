import React, { useContext } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { Link, useNavigate } from "react-router-native";
import styles from "../../styles";
import { UserContext } from "../context/user";

function Profile() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    fetch("http://127.0.0.1:5555/logout", { method: "DELETE" })
      .then((r) => r.json())
      .then((data) => {
        setUser(null);
        navigate("/");
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Link to="/">
        <Text style={styles.link}>Home</Text>
      </Link>
      <Link to="/conditions">
        <Text style={styles.link}>Conditions</Text>
      </Link>
      <Text>This is the Profile screen</Text>
      <Button
        onPress={handleLogout}
        style={styles.buttonContainer}
        title="Logout"
      />
    </SafeAreaView>
  );
}

export default Profile;
