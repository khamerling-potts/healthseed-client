import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextComponent,
} from "react-native";
import styles from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput, Button } from "react-native-paper";
import ProviderCard from "../components/ProviderCard";
import { ProvidersContext } from "../context/providers";

function Providers() {
  const { providers, setProviders } = useContext(ProvidersContext);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/providers").then((r) => {
      if (r.ok) {
        r.json().then((providers) => setProviders(providers));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  const providersToDisplay = providers
    .sort((a, b) => a.id - b.id)
    .map((provider) => <ProviderCard provider={provider} key={provider.id} />);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      countryCode: "",
    },
    validationSchema: Yup.object({
      // add phone validation here
      name: Yup.string().required("Name required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            ...values,
            phone: "+" + values.countryCode + values.phone,
          },
          null,
          2
        ),
      };
      fetch("http://127.0.0.1:5555/providers", configObj).then((r) => {
        if (r.ok) {
          r.json().then((provider) => {
            console.log(provider);
            setProviders([...providers, provider]);
          });
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the Providers screen</Text>
      <ScrollView>{providersToDisplay}</ScrollView>

      <TextInput
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        value={formik.values.name}
        placeholder="Enter provider name here"
        style={styles.loginForm}
      ></TextInput>
      <TextInput
        onChangeText={formik.handleChange("address")}
        onBlur={formik.handleBlur("address")}
        value={formik.values.address}
        placeholder="Enter provider address here"
        style={styles.loginForm}
      ></TextInput>
      <TextInput
        onChangeText={formik.handleChange("countryCode")}
        onBlur={formik.handleBlur("countryCode")}
        value={formik.values.countryCode}
        left={<TextInput.Icon icon="plus" />}
        placeholder="Country Code"
      />
      <TextInput
        onChangeText={formik.handleChange("phone")}
        onBlur={formik.handleBlur("phone")}
        value={formik.values.phone}
        placeholder="Enter provider phone here"
        style={styles.loginForm}
      ></TextInput>
      <Button onPress={formik.handleSubmit}>Add</Button>
    </SafeAreaView>
  );
}

export default Providers;
