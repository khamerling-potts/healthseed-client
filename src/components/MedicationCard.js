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

function MedicationCard({ medication }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [instructionFormVisible, setInstructionFormVisible] = useState(false);
  const { medications, setMedications } = useContext(MedicationsContext);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const id = medication.id;

  const instructionChips = medication.instructions.map((instruction) => (
    <InstructionChip
      key={instruction.id}
      instruction={instruction}
      page={"medications"}
    />
  ));

  function handleEditMedication(editedMedication) {
    const updatedMedications = medications.filter(
      (medication) => medication.id !== editedMedication.id
    );
    setMedications([...updatedMedications, editedMedication]);
  }

  function deleteMedication() {
    fetch(`http://127.0.0.1:5555/medications/${medication.id}`, {
      method: "DELETE",
    }).then((r) => {
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

      {!editFormVisible ? (
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Card.Title
              title={medication.name}
              subtitle="subtitle"
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
                      setEditFormVisible(true);
                    }}
                    title="Edit"
                  />
                  <Menu.Item
                    onPress={() => deleteMedication()}
                    title="Delete"
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
      ) : (
        <Formik
          initialValues={{
            name: medication.name,
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Medication name required"),
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
              `http://127.0.0.1:5555/medications/${medication.id}`,
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
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Enter medication name here"
                style={styles.card}
                autoFocus={true}
                right={<TextInput.Icon icon="check" onPress={handleSubmit} />}
              ></TextInput>
              <HelperText
                visible={errors.name}
                type="error"
                style={styles.helperText}
              >
                {errors.name}
              </HelperText>
            </>
          )}
        </Formik>
      )}
    </>
  );
}

export default MedicationCard;

{
  /* <Formik
              key={"key1"}
              initialValues={{
                name: medication.name,
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Medication name required"),
              })}
              validateOnChange={false}
              onSubmit={(values, { resetForm }) => {
                const configObj = {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values, null, 2),
                };
                fetch(
                  `http://127.0.0.1:5555/medications/${medication.id}`,
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
                  <Card.Title
                    key={"key2"}
                    title={
                      <Text>
                        <TextInput
                          onChangeText={() => {
                            console.log(editInputRef.current);
                            handleChange("name");
                          }}
                          onBlur={handleBlur("name")}
                          value={values.name}
                          placeholder="Enter medication name here"
                          style={styles.editMedicationInput}
                          ref={editInputRef}
                          autoFocus={true}
                        ></TextInput>
                        <HelperText
                          visible={errors.name}
                          type="error"
                          style={styles.helperText}
                        >
                          {errors.name}
                        </HelperText>
                      </Text>
                    }
                    subtitle="subtitle"
                    right={(props) => (
                      <IconButton
                        {...props}
                        icon="check"
                        onPress={handleSubmit}
                      />
                    )}
                  ></Card.Title>
                </>
              )}
            </Formik> */
}

{
  /* <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.formModal}
        > */
}
{
  /* <MedicationForm
            setModalVisible={setModalVisible}
            medication={medication}
            method="PATCH"
            medications={medications}
            setMedications={setMedications}
          /> */
}

{
  /* <TextInput
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
          />
          <Button onPress={formik.handleSubmit}>Save</Button>
        </Modal>
      </Portal> */
}
