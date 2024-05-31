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
import { AppointmentsContext } from "../context/appointments";

function Providers() {
  const { providers, setProviders } = useContext(ProvidersContext);
  const [providerFormVisible, setProviderFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);
  const [currentProvider, setCurrentProvider] = useState(null);
  const { appointments, setAppointments } = useContext(AppointmentsContext);

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
          {providersToDisplay.length ? (
            providersToDisplay
          ) : (
            <Text style={{ marginTop: 20 }}>
              You have not logged any providers
            </Text>
          )}
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
