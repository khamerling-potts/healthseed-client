import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TextComponent,
  KeyboardAvoidingView,
} from "react-native";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { AnimatedFAB, Text } from "react-native-paper";
import ConditionCard from "../components/ConditionCard";
import { ConditionsContext } from "../context/conditions";
import ConditionForm from "../components/ConditionForm";

function Conditions() {
  const { user } = useContext(UserContext);
  const { conditions, setConditions } = useContext(ConditionsContext);
  const [conditionFormVisible, setConditionFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);
  const [currentCondition, setCurrentCondition] = useState(null);

  const conditionsToDisplay = conditions
    .sort((a, b) => a.id - b.id)
    .map((condition) => (
      <ConditionCard
        key={condition.id}
        condition={condition}
        setConditionFormVisible={setConditionFormVisible}
        setFABExtended={setFABExtended}
        setCurrentCondition={setCurrentCondition}
      />
    ));

  return (
    <SafeAreaView style={styles.container}>
      {!conditionFormVisible ? (
        <Text variant="titleMedium" style={{ marginTop: 10 }}>
          Your Conditions
        </Text>
      ) : null}

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <ScrollView
          style={styles.conditionsScrollView}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {conditionsToDisplay.length ? (
            conditionsToDisplay
          ) : (
            <Text style={{ marginTop: 20 }}>
              You have not logged any conditions
            </Text>
          )}
        </ScrollView>
        {conditionFormVisible ? (
          <ConditionForm
            setConditionFormVisible={setConditionFormVisible}
            setFABExtended={setFABExtended}
            condition={currentCondition}
          />
        ) : null}
      </KeyboardAvoidingView>

      <AnimatedFAB
        icon={FABExtended ? "plus" : "minus"}
        label="Add condition"
        extended={FABExtended}
        onPress={() => {
          if (FABExtended) {
            setFABExtended(false);
            setCurrentCondition(null);
            setConditionFormVisible(true);
          } else {
            setFABExtended(true);
            setConditionFormVisible(false);
          }
        }}
        // visible={visible}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={{ bottom: 20, right: 20 }}
      />
    </SafeAreaView>
  );
}

export default Conditions;
