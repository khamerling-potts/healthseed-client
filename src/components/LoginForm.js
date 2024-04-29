import React, { useContext } from "react";
import { Button, SafeAreaView, TextInput, View } from "react-native";
import { Formik, useFormik } from "formik";
import { UserContext } from "../context/user";
import * as Yup from "yup";
import styles from "../../styles";

function LoginForm() {
  const { user, setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      };
      fetch("http://127.0.0.1:5555/login", configObj).then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        value={formik.values.username}
        placeholder="Username"
        style={styles.loginForm}
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        placeholder="Password"
        style={styles.loginForm}
        autoCapitalize="none"
        // secureTextEntry
      ></TextInput>
      <Button onPress={formik.handleSubmit} title="Login" />
    </SafeAreaView>
  );
}

export default LoginForm;
