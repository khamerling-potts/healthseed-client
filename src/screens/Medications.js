import React, { useContext, useState, useEffect } from "react";
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
import { TextInput, Button, FAB, AnimatedFAB } from "react-native-paper";
import MedicationCard from "../components/MedicationCard";
import { MedicationsContext } from "../context/medications";

function Medications() {
  const { medications, setMedications } = useContext(MedicationsContext);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/medications").then((r) => {
      if (r.ok) {
        r.json().then((medications) => setMedications(medications));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  const medicationsToDisplay = medications
    .sort((a, b) => a.id - b.id)
    .map((medication) => (
      <MedicationCard medication={medication} key={medication.id} />
    ));

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      };
      fetch("http://127.0.0.1:5555/medications", configObj).then((r) => {
        if (r.ok) {
          r.json().then((medication) => {
            console.log(medication);
            setMedications([...medications, medication]);
            setAddFormVisible(false);
            setFABExtended(true);
            resetForm();
          });
        } else {
          r.json().then((err) => console.log(err));
        }
      });
      //   resetForm();
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ borderWidth: 2, flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={64}
      >
        <Text>This is the Medications screen</Text>

        <ScrollView nestedScrollEnabled={true} style={{ borderWidth: 1 }}>
          {medicationsToDisplay}
        </ScrollView>
        <AnimatedFAB
          icon={FABExtended ? "plus" : "minus"}
          label="New medication"
          extended={FABExtended}
          onPress={() => {
            if (FABExtended) {
              setFABExtended(false);
              setAddFormVisible(true);
            } else {
              setFABExtended(true);
              setAddFormVisible(false);
            }
          }}
          // visible={visible}
          animateFrom={"right"}
          iconMode={"dynamic"}
          style={styles.addFAB}
        />
        {addFormVisible ? (
          <>
            <TextInput
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
              placeholder="Enter medication name here"
              style={styles.loginForm}
            ></TextInput>
            <TextInput placeholder="test" style={styles.loginForm}></TextInput>
            <Button onPress={formik.handleSubmit}>Add</Button>
          </>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Medications;
