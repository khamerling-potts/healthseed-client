import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, Button } from "react-native";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

function Conditions() {
  const { user } = useContext(UserContext);
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/conditions").then((r) => {
      if (r.ok) {
        r.json().then((conditions) => setConditions(conditions));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  const conditionsToDisplay = conditions.map((condition) => (
    <Text key={condition.id}>{condition.description}</Text>
  ));

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      };
      fetch("http://127.0.0.1:5555/conditions", configObj).then((r) => {
        if (r.ok) {
          r.json().then((condition) => {
            console.log(condition);
            setConditions([...conditions, condition]);
          });
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the conditions page</Text>
      {conditionsToDisplay}
      <TextInput
        onChangeText={formik.handleChange("description")}
        onBlur={formik.handleBlur("description")}
        value={formik.values.description}
        placeholder="Enter condition description here"
        style={styles.loginForm}
      ></TextInput>
      <Button onPress={formik.handleSubmit} title="Add" />
    </SafeAreaView>
  );
}

export default Conditions;
