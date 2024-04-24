import React, { useState } from "react";
import { View, ScrollView, Text, KeyboardAvoidingView } from "react-native";
import styles from "../../styles";
import { Formik } from "formik";
import { TextInput, Button, HelperText } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import * as Yup from "yup";

function EditInstructionForm({
  instruction,
  setEditFormVisible,
  medications,
  setMedications,
}) {
  const [showDropDown, setShowDropDown] = useState(false);

  console.log(medications);

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

  // Updates medications state after a medication's instruction is edited
  function handleEditMedication(editedMedication) {
    const updatedMedications = medications.filter(
      (medication) => medication.id !== editedMedication.id
    );
    setMedications([...updatedMedications, editedMedication]);
  }

  // Deletes an instruction from the server and updates corresponding medication state
  function onDeleteInstruction() {
    fetch(`http://127.0.0.1:5555/instructions/${instruction.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((medication) => {
          console.log("updated med: ", medication);
          handleEditMedication(medication);
          setEditFormVisible(false);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  return (
    <Formik
      initialValues={{
        time: instruction.time,
        dose: instruction.dose,
      }}
      validationSchema={Yup.object({
        time: Yup.string().required("Time required"),
        dose: Yup.string().required("Dose required"),
      })}
      onSubmit={(values, { resetForm }) => {
        const configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        };
        fetch(
          `http://127.0.0.1:5555/instructions/${instruction.id}`,
          configObj
        ).then((r) => {
          if (r.ok) {
            r.json().then((medication) => {
              handleEditMedication(medication);
              setEditFormVisible(false);
              resetForm();
            });
          } else {
            r.json().then((err) => console.log(err));
          }
        });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <Text>{instruction.medication.name}</Text>

          <DropDown
            label={"Select time taken"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={values.time}
            setValue={handleChange("time")}
            onBlur={handleBlur("time")}
            list={timeList}
            inputProps={{ style: styles.timeDropDown }}
          />
          <HelperText
            visible={errors.time}
            type="error"
            style={styles.helperText}
          >
            {errors.time}
          </HelperText>

          <TextInput
            onChangeText={handleChange("dose")}
            onBlur={handleBlur("dose")}
            value={values.dose}
            placeholder="Enter dosage here"
            style={styles.dosageInput}
          ></TextInput>
          <HelperText
            visible={errors.dose}
            type="error"
            style={styles.helperText}
          >
            {errors.dose}
          </HelperText>

          <Button onPress={handleSubmit}>Save</Button>
          <Button onPress={onDeleteInstruction}>Delete instruction</Button>
        </>
      )}
    </Formik>
  );
}

export default EditInstructionForm;
