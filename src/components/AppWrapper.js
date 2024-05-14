import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
import { UserContext, UserProvider } from "../context/user";
import LoginForm from "../components/LoginForm";
import SignUpForm from "./SignUpForm";
import SideNav from "./SideNav";
import styles from "../../styles";
import { LoginMethodContext } from "../context/loginmethod";

function AppWrapper() {
  const { user, setUser } = useContext(UserContext);
  const { loginMethod, setLoginMethod } = useContext(LoginMethodContext);

  let landingPageContent = (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: "transparent" }}
    >
      <Text>Better health management, right in your pocket</Text>
      <Button onPress={() => setLoginMethod("login")}>Log in</Button>
      <Button onPress={() => setLoginMethod("signup")}>Create account</Button>
    </SafeAreaView>
  );

  if (loginMethod === "login") {
    landingPageContent = <LoginForm />;
  } else if (loginMethod === "signup") {
    landingPageContent = <SignUpForm />;
  }

  const image = {
    uri: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
  };

  return (
    <>
      {user ? (
        <SideNav />
      ) : (
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {landingPageContent}
        </ImageBackground>
      )}
    </>
  );
}

export default AppWrapper;

// return (
//   <>
//     {user ? (
//       <SideNav />
//     ) : (
//       <ImageBackground
//         source="../../assets/background-image.jpg"
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           borderWidth: 2,
//           borderColor: "blue",
//         }}
//         resizeMode="cover"
//       >
//         <LoginForm />
//         <SignUpForm />
//       </ImageBackground>
//     )}
//   </>
// );
