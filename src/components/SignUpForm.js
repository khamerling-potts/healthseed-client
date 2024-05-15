import React, { useContext, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import { Formik, useFormik } from "formik";
import { UserContext } from "../context/user";
import * as Yup from "yup";
import styles from "../../styles";
import { LoginMethodContext } from "../context/loginmethod";
import DateTimePicker from "@react-native-community/datetimepicker";

function SignUpForm() {
  const { user, setUser } = useContext(UserContext);
  const { setLoginMethod } = useContext(LoginMethodContext);
  const [birthday, setBirthday] = useState(new Date(2000, 0, 1));
  const [usernameTaken, setUsernameTaken] = useState(false);

  const onBirthdayChange = (event, selectedDate) => {
    setBirthday(selectedDate);
  };

  function handleUsernameChange(newUsername) {
    formik.setFieldValue("username", newUsername);
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newUsername }),
    };
    fetch("http://127.0.0.1:5555/check_username", configObj).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUsernameTaken(false);
        });
      } else {
        r.json().then((err) => {
          setUsernameTaken(true);
        });
      }
    });
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      name: Yup.string().required("Username required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { ...values, birthday: birthday.toDateString() },
          null,
          2
        ),
      };
      fetch("http://127.0.0.1:5555/users", configObj).then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    },
  });
  return (
    <>
      <TextInput
        onChangeText={(newUsername) => {
          handleUsernameChange(newUsername);
        }}
        onBlur={formik.handleBlur("username")}
        value={formik.values.username}
        placeholder="Username"
        style={styles.loginForm}
        autoCapitalize="none"
        mode="outlined"
        label={
          formik.values.username == "" ? (
            ""
          ) : usernameTaken ? (
            <Text style={{ color: "red" }}>Username taken ✗</Text>
          ) : (
            <Text style={{ color: "green" }}>Username available ✓</Text>
          )
        }
      ></TextInput>

      <HelperText
        visible={!!(formik.touched.username && formik.errors.username)}
        style={styles.helperText}
        type="error"
      >
        {formik.errors.username}
      </HelperText>

      <TextInput
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        value={formik.values.name}
        placeholder="Name"
        style={styles.loginForm}
        mode="outlined"
      ></TextInput>
      <HelperText
        visible={!!(formik.touched.name && formik.errors.name)}
        style={styles.helperText}
        type="error"
      >
        {formik.errors.name}
      </HelperText>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text variant="labelLarge">Enter your birthday:</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={birthday}
          mode={"date"}
          onChange={onBirthdayChange}
          accentColor="#3A4954"
          style={styles.birthdayPicker}
          placeholderText="Enter your birthday"
        />
      </View>

      <TextInput
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        placeholder="Password"
        style={styles.loginForm}
        autoCapitalize="none"
        mode="outlined"
        secureTextEntry
      ></TextInput>
      <HelperText
        visible={!!(formik.touched.password && formik.errors.password)}
        style={styles.helperText}
        type="error"
      >
        {formik.errors.password}
      </HelperText>
      <Button
        onPress={formik.handleSubmit}
        style={styles.landingButton}
        textColor="white"
      >
        Sign up
      </Button>
      <Button onPress={() => setLoginMethod("none")} textColor="#443850">
        Back
      </Button>
    </>
  );
}

export default SignUpForm;
