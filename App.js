import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [users, setUsers] = useState([]);
  usersToDisplay = users.map((user) => <Text key={user.id}>{user.name}</Text>);

  useEffect(() => {
    fetch(
      "https://healthseed-flask-backend-94c8efc27481.herokuapp.com/users"
    ).then((r) => {
      if (r.ok) {
        r.json().then((data) => setUsers(data));
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      {usersToDisplay ? usersToDisplay : "No users"}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
