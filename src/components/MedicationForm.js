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
} from "react-native-paper";
import { MedicationsContext } from "../context/medications";
import DropDown from "react-native-paper-dropdown";

function MedicationForm({
  setAddFormVisible,
  setFABExtended,
  setModalVisible,
  method,
  medication,
  medications,
  setMedications,
}) {
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
    <View style={{ borderWidth: 1 }}>
      <ScrollView>
        <Formik
          initialValues={{
            name: medication ? medication.name : "",
            time1: instructions && instructions[0] ? instructions[0].time : "",
            dose1: instructions && instructions[0] ? instructions[0].dose : "",
            time2: instructions && instructions[1] ? instructions[1].time : "",
            dose2: instructions && instructions[1] ? instructions[1].dose : "",
            time3: instructions && instructions[2] ? instructions[2].time : "",
            dose3: instructions && instructions[2] ? instructions[2].dose : "",
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
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Enter medication name here"
                style={styles.medicationName}
              ></TextInput>
              <HelperText
                visible={touched.name && errors.name}
                type="error"
                style={styles.helperText}
              >
                {errors.name}
              </HelperText>
              <List.Subheader numberOfLines={2}>
                *Optional Add Morning, Afternoon, and/or Evening instructions
              </List.Subheader>
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
                placeholder="Enter dosage here"
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
                placeholder="Enter dosage here"
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
                placeholder="Enter dosage here"
                style={styles.dosageInput}
              ></TextInput>
              <HelperText
                visible={errors.dose3}
                type="error"
                style={styles.helperText}
              >
                {errors.dose3}
              </HelperText>
              <Button onPress={handleSubmit}>Save</Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default MedicationForm;

// const formik = useFormik({
//     initialValues: {
//       name: medication ? medication.name : "",
//       time1: instructions && instructions[0] ? instructions[0].time : "",
//       dose1: instructions && instructions[0] ? instructions[0].dose : "",
//       time2: instructions && instructions[1] ? instructions[1].time : "",
//       dose2: instructions && instructions[1] ? instructions[1].dose : "",
//       time3: instructions && instructions[2] ? instructions[2].time : "",
//       dose3: instructions && instructions[2] ? instructions[2].dose : "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Name required"),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       const configObj = {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values, null, 2),
//       };
//       fetch(
//         `http://127.0.0.1:5555/medications${
//           medication ? "/" + medication.id : ""
//         }`,
//         configObj
//       ).then((r) => {
//         if (r.ok) {
//           r.json().then((medication) => {
//             console.log(medication);
//             if (method === "POST") {
//               setMedications([...medications, medication]);
//               setAddFormVisible(false);
//               setFABExtended(true);
//             } else if (method === "PATCH") {
//               handleEditMedication(medication);
//               setModalVisible(false);
//             }

//             resetForm();
//           });
//         } else {
//           r.json().then((err) => console.log(err));
//         }
//       });
//       //   resetForm();
//     },
//   });
