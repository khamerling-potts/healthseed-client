import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import styles from "../../styles";
import { Formik } from "formik";
import {
  TextInput,
  Button,
  List,
  HelperText,
  Divider,
  Text,
} from "react-native-paper";
import { MedicationsContext } from "../context/medications";
import DropDown from "react-native-paper-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import { RoutinesContext } from "../context/routines";
import { InstructionsContext } from "../context/instructions";

function MedicationForm({
  setMedicationFormVisible,
  setFABExtended,
  setModalVisible,
  medication,
}) {
  const [showDropDown, setShowDropDown] = useState([false, false, false]);
  const { medications, setMedications } = useContext(MedicationsContext);
  const { fetchRoutines } = useContext(RoutinesContext);
  const { fetchInstructions } = useContext(InstructionsContext);

  //conditionally assigning fetch properties based on whether adding or editing medication
  const URL = medication
    ? `https://healthseed-flask-backend-94c8efc27481.herokuapp.com/medications${
        "/" + medication.id
      }`
    : `https://healthseed-flask-backend-94c8efc27481.herokuapp.com/medications`;
  const method = medication ? "PATCH" : "POST";

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

  const validate = (values) => {
    const errors = {};

    // name validation
    if (!values.name) {
      errors.name = "Required";
    }

    // time and dose validations
    if (values.time1 === "" && values.dose1 !== "") {
      errors.time1 = "Must provide a time if specifying a dosage";
    }
    if (values.dose1 === "" && values.time1 !== "") {
      errors.dose1 = "Must provide a dosage if specifying a time";
    }

    if (values.time2 === "" && values.dose2 !== "") {
      errors.time2 = "Must provide a time if specifying a dosage";
    }
    if (values.dose2 === "" && values.time2 !== "") {
      errors.dose2 = "Must provide a dosage if specifying a time";
    }

    if (values.time3 === "" && values.dose3 !== "") {
      errors.time3 = "Must provide a time if specifying a dosage";
    }
    if (values.dose3 === "" && values.time3 !== "") {
      errors.dose3 = "Must provide a dosage if specifying a time";
    }

    return errors;
  };

  return (
    <View>
      <ScrollView>
        <Formik
          initialValues={{
            name: medication ? medication.name : "",
            time1: "",
            dose1: "",
            time2: "",
            dose2: "",
            time3: "",
            dose3: "",
            notes: medication ? medication.notes : "",
          }}
          validate={validate}
          onSubmit={(values, { resetForm }) => {
            const configObj = {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values, null, 2),
            };
            fetch(URL, configObj).then((r) => {
              if (r.ok) {
                r.json().then((medication) => {
                  if (method === "POST") {
                    setMedications([...medications, medication]);
                  } else {
                    handleEditMedication(medication);
                  }
                  setMedicationFormVisible(false);
                  setFABExtended(true);

                  //must refetch routines and instructions because their medications were modified
                  console.log("calling fetch routines");
                  fetchRoutines();
                  fetchInstructions();
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
              <Text
                variant="titleMedium"
                style={{ marginBottom: 10, textAlign: "center" }}
              >
                {medication
                  ? "Edit medication details below:"
                  : "Fill out medication details below"}
              </Text>
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                label="Medication name"
                style={styles.medicationName}
              ></TextInput>
              <HelperText
                visible={touched.name && errors.name}
                type="error"
                style={styles.helperText}
              >
                {errors.name}
              </HelperText>

              <TextInput
                onChangeText={handleChange("notes")}
                onBlur={handleBlur("notes")}
                value={values.notes}
                label="Optional notes"
                style={styles.medicationName}
                multiline
              ></TextInput>

              {/* 3 instruction forms will be visible when adding a new med, but not when editing */}
              {!medication ? (
                <>
                  <List.Subheader numberOfLines={2}>
                    Add up to 3 medication instructions. More can be added
                    later.
                  </List.Subheader>
                  <List.Accordion
                    title="Instruction 1"
                    style={styles.instructionAccordion}
                  >
                    <Text />
                    <DropDown
                      label={"Select time taken"}
                      mode={"outlined"}
                      visible={showDropDown[0]}
                      showDropDown={() => setShowDropDown([true, false, false])}
                      onDismiss={() => setShowDropDown([false, false, false])}
                      value={values.time1}
                      setValue={handleChange("time1")}
                      onBlur={handleBlur("time1")}
                      list={timeList}
                      inputProps={{ style: styles.timeDropDown }}
                      dropDownItemSelectedStyle={{ backgroundColor: "#DCE4E8" }}
                    />
                    <HelperText
                      visible={errors.time1}
                      type="error"
                      style={styles.helperText}
                    >
                      {errors.time1}
                    </HelperText>

                    <TextInput
                      onChangeText={handleChange("dose1")}
                      onBlur={handleBlur("dose1")}
                      value={values.dose1}
                      label="Dosage"
                      placeholder="E.g. 2 tablets, 5mg"
                      style={styles.dosageInput}
                    ></TextInput>
                    <HelperText
                      visible={errors.dose1}
                      type="error"
                      style={styles.helperText}
                    >
                      {errors.dose1}
                    </HelperText>
                    <Divider style={styles.divider} />
                  </List.Accordion>
                  <List.Accordion
                    title="Instruction 2"
                    style={styles.instructionAccordion}
                  >
                    <Text />

                    <DropDown
                      label={"Select time taken"}
                      mode={"outlined"}
                      visible={showDropDown[1]}
                      showDropDown={() => setShowDropDown([false, true, false])}
                      onDismiss={() => setShowDropDown([false, false, false])}
                      value={values.time2}
                      setValue={handleChange("time2")}
                      onBlur={handleBlur("time2")}
                      list={timeList}
                      inputProps={{ style: styles.timeDropDown }}
                      dropDownItemSelectedStyle={{ backgroundColor: "#DCE4E8" }}
                    />
                    <HelperText
                      visible={errors.time2}
                      type="error"
                      style={styles.helperText}
                    >
                      {errors.time2}
                    </HelperText>

                    <TextInput
                      onChangeText={handleChange("dose2")}
                      onBlur={handleBlur("dose2")}
                      value={values.dose2}
                      label="Dosage"
                      placeholder="E.g. 2 tablets, 5mg"
                      style={styles.dosageInput}
                    ></TextInput>
                    <HelperText
                      visible={errors.dose2}
                      type="error"
                      style={styles.helperText}
                    >
                      {errors.dose2}
                    </HelperText>
                    <Divider style={styles.divider} />
                  </List.Accordion>
                  <List.Accordion
                    title="Instruction 3"
                    style={styles.instructionAccordion}
                  >
                    <Text />
                    <DropDown
                      label={"Select time taken"}
                      mode={"outlined"}
                      visible={showDropDown[2]}
                      showDropDown={() => setShowDropDown([false, false, true])}
                      onDismiss={() => setShowDropDown([false, false, false])}
                      value={values.time3}
                      setValue={handleChange("time3")}
                      onBlur={handleBlur("time3")}
                      list={timeList}
                      inputProps={{ style: styles.timeDropDown }}
                      dropDownItemSelectedStyle={{ backgroundColor: "#DCE4E8" }}
                    />
                    <HelperText
                      visible={errors.time3}
                      type="error"
                      style={styles.helperText}
                    >
                      {errors.time3}
                    </HelperText>

                    <TextInput
                      onChangeText={handleChange("dose3")}
                      onBlur={handleBlur("dose3")}
                      value={values.dose3}
                      label="Dosage"
                      placeholder="E.g. 2 tablets, 5mg"
                      style={styles.dosageInput}
                    ></TextInput>
                    <HelperText
                      visible={errors.dose3}
                      type="error"
                      style={styles.helperText}
                    >
                      {errors.dose3}
                    </HelperText>
                  </List.Accordion>
                </>
              ) : null}

              <Button
                onPress={handleSubmit}
                style={styles.saveButton}
                textColor="#fafafa"
              >
                Save
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default MedicationForm;
