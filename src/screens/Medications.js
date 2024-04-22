import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextComponent,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput, Button, FAB, AnimatedFAB } from "react-native-paper";
import MedicationCard from "../components/MedicationCard";
import { MedicationsContext } from "../context/medications";
import DropDown from "react-native-paper-dropdown";
import { List, Portal, Modal } from "react-native-paper";

function Medications() {
  const { medications, setMedications } = useContext(MedicationsContext);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);
  const [showDropDown, setShowDropDown] = useState([false, false, false]);

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

  const timeList = [
    {
      label: "Morning",
      value: "morning",
    },
    {
      label: "Afternoon",
      value: "afternoon",
    },
    {
      label: "Evening",
      value: "evening",
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      time1: "",
      dose1: "",
      time2: "",
      dose2: "",
      time3: "",
      dose3: "",
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
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        {/* <Text>This is the Medications screen</Text> */}

        <ScrollView style={{ borderWidth: 1 }}>
          {medicationsToDisplay}
        </ScrollView>

        {addFormVisible ? (
          <View>
            <ScrollView>
              <TextInput
                onChangeText={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
                placeholder="Enter medication name here"
                style={styles.loginForm}
              ></TextInput>
              <List.Section>
                <List.Subheader>
                  Specify up to 3 times that you take this medication
                </List.Subheader>
                <DropDown
                  label={"Select time taken"}
                  mode={"outlined"}
                  visible={showDropDown[0]}
                  showDropDown={() => setShowDropDown([true, false, false])}
                  onDismiss={() => setShowDropDown([false, false, false])}
                  value={formik.values.time1}
                  setValue={formik.handleChange("time1")}
                  onBlur={formik.handleBlur("time1")}
                  list={timeList}
                  inputProps={{
                    right: <TextInput.Icon name={"chevron-down"} size={15} />,
                  }}
                />

                <TextInput
                  onChangeText={formik.handleChange("dose1")}
                  onBlur={formik.handleBlur("dose1")}
                  value={formik.values.dose1}
                  placeholder="Enter dosage here"
                  style={styles.loginForm}
                ></TextInput>
                <DropDown
                  label={"Select time taken"}
                  mode={"outlined"}
                  visible={showDropDown[1]}
                  showDropDown={() => setShowDropDown([false, true, false])}
                  onDismiss={() => setShowDropDown([false, false, false])}
                  value={formik.values.time2}
                  setValue={formik.handleChange("time2")}
                  onBlur={formik.handleBlur("time2")}
                  list={timeList}
                  inputProps={{
                    right: <TextInput.Icon name={"chevron-down"} size={15} />,
                  }}
                />
                <TextInput
                  onChangeText={formik.handleChange("dose2")}
                  onBlur={formik.handleBlur("dose2")}
                  value={formik.values.dose2}
                  placeholder="Enter dosage here"
                  style={styles.loginForm}
                ></TextInput>
                <DropDown
                  label={"Select time taken"}
                  mode={"outlined"}
                  visible={showDropDown[2]}
                  showDropDown={() => setShowDropDown([false, false, true])}
                  onDismiss={() => setShowDropDown([false, false, false])}
                  value={formik.values.time3}
                  setValue={formik.handleChange("time3")}
                  onBlur={formik.handleBlur("time3")}
                  list={timeList}
                  inputProps={{
                    right: <TextInput.Icon name={"chevron-down"} size={15} />,
                  }}
                />
                <TextInput
                  onChangeText={formik.handleChange("dose3")}
                  onBlur={formik.handleBlur("dose3")}
                  value={formik.values.dose3}
                  placeholder="Enter dosage here"
                  style={styles.loginForm}
                ></TextInput>
              </List.Section>
              <Button onPress={formik.handleSubmit}>Add</Button>
            </ScrollView>
          </View>
        ) : null}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Medications;
