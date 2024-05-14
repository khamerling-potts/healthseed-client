import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Surface, Text } from "react-native-paper";
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
    <>
      <Button
        onPress={() => setLoginMethod("login")}
        style={styles.landingButton}
        textColor="white"
      >
        Log in
      </Button>
      <Button onPress={() => setLoginMethod("signup")} textColor="#443850">
        Create account
      </Button>
    </>
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
          <SafeAreaView style={styles.landingContainer}>
            <Text variant="displaySmall" style={styles.landingText}>
              {"Healthseed\n"}
              <Text variant="bodyLarge" style={styles.landingText}>
                Better health management, right in your pocket.
              </Text>
            </Text>
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.landingKeyboardAvoidingView}
            >
              <Surface elevation={4} style={styles.landingPageSurface}>
                {landingPageContent}
              </Surface>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ImageBackground>
      )}
    </>
  );
}

export default AppWrapper;
