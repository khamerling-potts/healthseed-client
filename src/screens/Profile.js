import React, { useContext } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { Link, useNavigate } from "react-router-native";
import styles from "../../styles";
import { UserContext } from "../context/user";
import { LoginMethodContext } from "../context/loginmethod";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const { loginMethod, setLoginMethod } = useContext(LoginMethodContext);
  // const navigate = useNavigate();

  function handleLogout(e) {
    fetch("http://127.0.0.1:5555/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        setLoginMethod("none");
        // if I uncomment navigate, it'll save the route we were on before.
        // navigate("/");
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Link to="/">
        <Text style={styles.link}>Home</Text>
      </Link>
      <Link to="/conditions">
        <Text style={styles.link}>Conditions</Text>
      </Link> */}
      <Text>This is the Profile screen</Text>
      <Text>Hi, {user.name}</Text>
      <Button
        onPress={handleLogout}
        style={styles.buttonContainer}
        title="Logout"
      />
    </SafeAreaView>
  );
}

export default Profile;
