import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";
import LoginForm from "../components/LoginForm";
// import RoutesComponent from "../../routes";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  usersToDisplay = users.map((user) => <Text key={user.id}>{user.name}</Text>);

  console.log(user);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5555/users").then((r) => {
  //     if (r.ok) {
  //       r.json().then((data) => setUsers(data));
  //     }
  //   });
  // }, []);

  return (
    <>
      {user ? (
        <View style={styles.container}>
          {/* <StatusBar style="auto" /> */}
          <Link to="/">
            <Text style={styles.link}>Home</Text>
          </Link>
          <Link to="/profile">
            <Text style={styles.link}>Profile</Text>
          </Link>
          <Link to="/conditions">
            <Text style={styles.link}>Conditions</Text>
          </Link>
          <View>
            <Text>This is the Home screen</Text>
            <Text>
              Users from database:{" "}
              {usersToDisplay ? usersToDisplay : "No users"}
            </Text>
          </View>
          {/* <UserProvider> */}
          {/* <RoutesComponent /> */}
          {/* </UserProvider> */}
        </View>
      ) : (
        // <UserProvider>
        <LoginForm />
        // </UserProvider>
      )}
    </>
  );
}

export default Home;
