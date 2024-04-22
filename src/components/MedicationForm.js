import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import styles from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput, Button, List } from "react-native-paper";
import { MedicationsContext } from "../context/medications";
import DropDown from "react-native-paper-dropdown";

function MedicationForm({
  setAddFormVisible,
  setFABExtended,
  setModalVisible,
  method,
  medication,
}) {
  console.log(medication);
  const { medications, setMedications } = useContext(MedicationsContext);
  const [showDropDown, setShowDropDown] = useState([false, false, false]);

  function handleEditMedication(editedMedication) {
    const updatedMedications = medications.filter(
      (medication) => medication.id !== editedMedication.id
    );
    setMedications([...updatedMedications, editedMedication]);
  }

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
    { label: "None", value: "" },
  ];

  const instructions = medication ? medication.instructions : null;

  const formik = useFormik({
    initialValues: {
      name: medication ? medication.name : "",
      time1: instructions && instructions[0] ? instructions[0].time : "",
      dose1: instructions && instructions[0] ? instructions[0].dose : "",
      time2: instructions && instructions[1] ? instructions[1].time : "",
      dose2: instructions && instructions[1] ? instructions[1].dose : "",
      time3: instructions && instructions[2] ? instructions[2].time : "",
      dose3: instructions && instructions[2] ? instructions[2].dose : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const configObj = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      };
      fetch(
        `http://127.0.0.1:5555/medications${
          medication ? "/" + medication.id : ""
        }`,
        configObj
      ).then((r) => {
        if (r.ok) {
          r.json().then((medication) => {
            console.log(medication);
            if (method === "POST") {
              setMedications([...medications, medication]);
              setAddFormVisible(false);
              setFABExtended(true);
            } else if (method === "PATCH") {
              handleEditMedication(medication);
              setModalVisible(false);
            }

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
    <View style={{ borderWidth: 1 }}>
      <ScrollView>
        <TextInput
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
          placeholder="Enter medication name here"
          style={styles.loginForm}
        ></TextInput>
        <List.Section>
          <List.Subheader numberOfLines={2}>
            *Optional Add Morning, Afternoon, and/or Evening instructions
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
        <Button onPress={formik.handleSubmit}>Save</Button>
      </ScrollView>
    </View>
  );
}

export default MedicationForm;
