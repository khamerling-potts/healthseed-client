import React, { useContext, useState } from "react";
import { Button, TextInput, HelperText } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { Formik, setIn, useFormik } from "formik";
import { UserContext } from "../context/user";
import * as Yup from "yup";
import styles from "../../styles";
import { LoginMethodContext } from "../context/loginmethod";

function LoginForm() {
  const { user, setUser } = useContext(UserContext);
  const { loginMethod, setLoginMethod } = useContext(LoginMethodContext);
  const [invalid, setInvalid] = useState(false);

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
          r.json().then((err) => {
            setInvalid(true);
            console.log(err);
          });
        }
      });
    },
  });
  return (
    // <SafeAreaView
    //   style={{ ...styles.container, backgroundColor: "transparent" }}
    // >
    <>
      {invalid ? (
        <HelperText style={styles.helperText} type="error">
          Invalid login credentials. Please try again.
        </HelperText>
      ) : null}

      <TextInput
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        value={formik.values.username}
        placeholder="Username"
        style={styles.loginForm}
        autoCapitalize="none"
        mode="outlined"
      ></TextInput>
      <HelperText
        visible={!!(formik.touched.username && formik.errors.username)}
        style={styles.helperText}
        type="error"
      >
        {formik.errors.username}
      </HelperText>
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
        Log in
      </Button>
      <Button onPress={() => setLoginMethod("none")} textColor="#443850">
        Back
      </Button>
    </>
    // </SafeAreaView>
  );
}

export default LoginForm;
