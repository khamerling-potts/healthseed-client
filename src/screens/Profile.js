import React, { useContext } from "react";
import { View, SafeAreaView } from "react-native";
import { Link, useNavigate } from "react-router-native";
import styles from "../../styles";
import { UserContext } from "../context/user";
import { LoginMethodContext } from "../context/loginmethod";
import { Avatar, Text, Button, Divider } from "react-native-paper";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const { loginMethod, setLoginMethod } = useContext(LoginMethodContext);
  // const navigate = useNavigate();
  const nameArray = user.name.split(" ");
  let initials = "";
  nameArray.forEach((name) => {
    initials += name[0];
  });

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
    <SafeAreaView style={{ ...styles.container, backgroundColor: "#DFEDD5" }}>
      <View style={styles.profileTopView}>
        <Avatar.Text size={130} label={initials} style={styles.avatar} />
        <Text
          variant="headlineSmall"
          style={{ color: "#737373", fontWeight: "bold" }}
        >
          Hi, {nameArray[0]}
        </Text>
      </View>

      <View style={styles.profileBottomView}>
        <View style={styles.userInfoView}>
          <View style={styles.userInfoLine}>
            <Text style={styles.userInfoText}>Name</Text>
            <Text style={styles.userInfoText}>{user.name}</Text>
          </View>
          <Divider style={styles.profileDivider} />
          <View style={styles.userInfoLine}>
            <Text style={styles.userInfoText}>Username</Text>
            <Text style={styles.userInfoText}>{user.username}</Text>
          </View>
          <Divider style={styles.profileDivider} />

          <View style={styles.userInfoLine}>
            <Text style={styles.userInfoText}>Birthday</Text>
            <Text style={styles.userInfoText}>{user.birthday}</Text>
          </View>
        </View>
        <Button
          onPress={handleLogout}
          textColor="#525451"
          style={styles.logoutButton}
          mode="elevated"
          labelStyle={{ fontWeight: "bold" }}
        >
          Log out
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Profile;
