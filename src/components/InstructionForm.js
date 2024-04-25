import React, { useState } from "react";
import { View, ScrollView, Text, KeyboardAvoidingView } from "react-native";
import styles from "../../styles";
import { Formik } from "formik";
import { TextInput, Button, HelperText } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import * as Yup from "yup";

// If instruction prop is defined, we're editing an instruction. If not, we're adding a new instruction
function InstructionForm({
  instruction,
  medication,
  setInstructionFormVisible,
  medications,
  setMedications,
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const URL = instruction
    ? `http://127.0.0.1:5555/instructions/${instruction.id}`
    : `http://127.0.0.1:5555/instructions`;

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
    fetch(URL, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((medication) => {
          console.log("updated med: ", medication);
          handleEditMedication(medication);
          setInstructionFormVisible(false);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  return (
    <Formik
      initialValues={{
        time: instruction ? instruction.time : "",
        dose: instruction ? instruction.dose : "",
      }}
      validationSchema={Yup.object({
        time: Yup.string().required("Time required"),
        dose: Yup.string().required("Dose required"),
      })}
      onSubmit={(values, { resetForm }) => {
        const configObj = {
          method: instruction ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            { ...values, medication_id: medication.id },
            null,
            2
          ),
        };
        fetch(URL, configObj).then((r) => {
          if (r.ok) {
            r.json().then((medication) => {
              handleEditMedication(medication);
              setInstructionFormVisible(false);
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
          {instruction ? <Text>{instruction.medication.name}</Text> : null}

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

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button onPress={handleSubmit}>Save</Button>
            {instruction ? (
              <Button onPress={onDeleteInstruction}>Delete instruction</Button>
            ) : null}
          </View>
        </>
      )}
    </Formik>
  );
}

export default InstructionForm;
