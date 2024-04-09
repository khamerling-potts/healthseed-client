import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../context/user";

function Home() {
  const currentUser = useContext(UserContext);
  const [users, setUsers] = useState([]);
  usersToDisplay = users.map((user) => <Text key={user.id}>{user.name}</Text>);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUsers(data));
      }
    });
  }, []);

  //   if(currentUser) return (

  //   )
  return (
    <View>
      <Text>This is the Home screen</Text>
      <Text>
        Users from database: {usersToDisplay ? usersToDisplay : "No users"}
      </Text>
    </View>
  );
}

export default Home;
