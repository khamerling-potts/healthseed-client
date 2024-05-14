import React, { useContext, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
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

  const onBirthdayChange = (event, selectedDate) => {
    setBirthday(selectedDate);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      birthday: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      name: Yup.string().required("Username required"),
      birthday: Yup.string().required("Username required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, birthday: birthday }, null, 2),
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
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        value={formik.values.username}
        placeholder="Username"
        style={styles.loginForm}
        autoCapitalize="none"
        mode="outlined"
      ></TextInput>
      <TextInput
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        value={formik.values.name}
        placeholder="Name"
        style={styles.loginForm}
        mode="outlined"
      ></TextInput>
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
