import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextComponent,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput, Button, AnimatedFAB } from "react-native-paper";
import ProviderCard from "../components/ProviderCard";
import { ProvidersContext } from "../context/providers";
import ProviderForm from "../components/ProviderForm";
import {
  parsePhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";

function Providers() {
  const { providers, setProviders } = useContext(ProvidersContext);
  const [providerFormVisible, setProviderFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);
  const [currentProvider, setCurrentProvider] = useState(null);

  const providersToDisplay = providers
    .sort((a, b) => a.id - b.id)
    .map((provider) => (
      <ProviderCard
        provider={provider}
        setProviderFormVisible={setProviderFormVisible}
        setFABExtended={setFABExtended}
        setCurrentProvider={setCurrentProvider}
        key={provider.id}
      />
    ));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <ScrollView style={styles.providersScrollView}>
          {providersToDisplay}
        </ScrollView>
        {providerFormVisible ? (
          <ProviderForm
            setProviderFormVisible={setProviderFormVisible}
            setFABExtended={setFABExtended}
            provider={currentProvider}
          />
        ) : null}
      </KeyboardAvoidingView>
      <AnimatedFAB
        icon={FABExtended ? "plus" : "minus"}
        label="Add provider"
        extended={FABExtended}
        onPress={() => {
          if (FABExtended) {
            setFABExtended(false);
            setCurrentProvider(null);
            setProviderFormVisible(true);
          } else {
            setFABExtended(true);
            setProviderFormVisible(false);
          }
        }}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={styles.addFAB}
      />
    </SafeAreaView>
  );
}

export default Providers;

// const formik = useFormik({
//   initialValues: {
//     name: "",
//     address: "",
//     phone: "",
//     countryCode: "",
//   },
//   validationSchema: Yup.object({
//     // add phone validation here
//     name: Yup.string().required("Name required"),
//   }),
//   onSubmit: (values, { resetForm }) => {
//     const configObj = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(
//         {
//           ...values,
//           phone: "+" + values.countryCode + values.phone,
//         },
//         null,
//         2
//       ),
//     };
//     fetch("http://127.0.0.1:5555/providers", configObj).then((r) => {
//       if (r.ok) {
//         r.json().then((provider) => {
//           console.log(provider);
//           setProviders([...providers, provider]);
//         });
//       } else {
//         r.json().then((err) => console.log(err));
//       }
//     });
//     resetForm();
//   },
// });
