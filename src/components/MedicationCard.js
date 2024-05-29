import React, { useContext } from "react";
import { useState } from "react";
import styles from "../../styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { View } from "react-native";
import {
  TextInput,
  Button,
  Card,
  IconButton,
  Menu,
  Modal,
  Portal,
  Text,
  HelperText,
  Icon,
  Chip,
} from "react-native-paper";
import {
  MedicationsContext,
  MedicationsProvider,
} from "../context/medications";
import MedicationForm from "./MedicationForm";
import InstructionChip from "./InstructionChip";
import InstructionForm from "./InstructionForm";

function MedicationCard({
  medication,
  setMedicationFormVisible,
  setFABExtended,
  setCurrentMedication,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [instructionFormVisible, setInstructionFormVisible] = useState(false);
  const { medications, setMedications } = useContext(MedicationsContext);
  const id = medication.id;

  const instructionChips = medication.instructions.map((instruction) => (
    <InstructionChip
      key={instruction.id}
      instruction={instruction}
      page={"medications"}
    />
  ));

  function onDeleteMedication() {
    fetch(
      `https://healthseed-flask-backend-94c8efc27481.herokuapp.com/medications/${medication.id}`,
      {
        method: "DELETE",
      }
    ).then((r) => {
      if (r.ok) {
        setMedications(
          medications.filter((medication) => medication.id !== id)
        );
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  return (
    <>
      {/* Portal only visible when editing an instruction */}
      <Portal>
        <Modal
          visible={instructionFormVisible}
          onDismiss={() => setInstructionFormVisible(false)}
          contentContainerStyle={styles.formModal}
        >
          <InstructionForm
            medication={medication}
            setInstructionFormVisible={setInstructionFormVisible}
            medications={medications}
            setMedications={setMedications}
          />
        </Modal>
      </Portal>

      {/* {!editFormVisible ? ( */}
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Card.Title
            title={medication.name}
            titleStyle={{ paddingVertical: 5 }}
            subtitle={`Notes: ${medication.notes ? medication.notes : ""}`}
            subtitleNumberOfLines={0}
            subtitleStyle={{ paddingBottom: 5 }}
            right={(props) => (
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <IconButton
                    {...props}
                    icon="dots-vertical"
                    onPress={() => {
                      setMenuVisible(true);
                    }}
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    setMenuVisible(false);
                    setMedicationFormVisible(true);
                    setFABExtended(false);
                    setCurrentMedication(medication);
                  }}
                  title="Edit"
                  leadingIcon="pencil"
                />
                <Menu.Item
                  onPress={() => onDeleteMedication()}
                  title="Delete"
                  leadingIcon="delete"
                />
              </Menu>
            )}
          />
        </Card.Content>
        <View style={styles.instructionChipsView}>
          {instructionChips}
          {instructionChips.length ? (
            <Chip
              style={styles.instructionChip}
              onPress={() => setInstructionFormVisible(true)}
            >
              <Icon source="plus" size={20} />
            </Chip>
          ) : (
            <Chip
              icon="plus"
              style={styles.instructionChip}
              onPress={() => setInstructionFormVisible(true)}
            >
              Add instructions
            </Chip>
          )}
        </View>
      </Card>
    </>
  );
}

export default MedicationCard;

// ) : (
//   <Formik
//     initialValues={{
//       name: medication.name,
//       notes: medication.notes,
//     }}
//     validationSchema={Yup.object({
//       name: Yup.string().required("Medication name required"),
//     })}
//     onSubmit={(values, { resetForm }) => {
//       const configObj = {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values, null, 2),
//       };
//       fetch(
//         `https://healthseed-flask-backend-94c8efc27481.herokuapp.com/medications/${medication.id}`,
//         configObj
//       ).then((r) => {
//         if (r.ok) {
//           r.json().then((medication) => {
//             handleEditMedication(medication);
//             setEditFormVisible(false);
//             resetForm();
//           });
//         } else {
//           r.json().then((err) => console.log(err));
//         }
//       });
//     }}
//   >
//     {({
//       handleChange,
//       handleBlur,
//       handleSubmit,
//       values,
//       errors,
//       touched,
//     }) => (
//       <>
//         <TextInput
//           onChangeText={handleChange("name")}
//           onBlur={handleBlur("name")}
//           value={values.name}
//           label="Medication name"
//           style={styles.card}
//           autoFocus={true}
//           right={<TextInput.Icon icon="check" onPress={handleSubmit} />}
//         ></TextInput>
//         <HelperText
//           visible={errors.name}
//           type="error"
//           style={styles.helperText}
//         >
//           {errors.name}
//         </HelperText>

//         <TextInput
//           onChangeText={handleChange("notes")}
//           onBlur={handleBlur("notes")}
//           value={values.notes}
//           label="Medication notes"
//           style={styles.card}
//           right={<TextInput.Icon icon="check" onPress={handleSubmit} />}
//         ></TextInput>
//       </>
//     )}
//   </Formik>
// )
//  }
