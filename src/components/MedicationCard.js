import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import styles from "../../styles";
import { useFormik } from "formik";
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
} from "react-native-paper";
import {
  MedicationsContext,
  MedicationsProvider,
} from "../context/medications";
import MedicationForm from "./MedicationForm";
import InstructionChip from "./InstructionChip";

function MedicationCard({ medication }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { medications, setMedications } = useContext(MedicationsContext);
  const id = medication.id;

  const instructionChips = medication.instructions.map((instruction) => (
    <InstructionChip key={instruction.id} instruction={instruction} />
  ));

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
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.formModal}
        >
          <MedicationForm
            setModalVisible={setModalVisible}
            medication={medication}
            method="PATCH"
            medications={medications}
            setMedications={setMedications}
          />

          {/* <TextInput
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
          />
          <Button onPress={formik.handleSubmit}>Save</Button> */}
        </Modal>
      </Portal>
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
                    setModalVisible(true);
                    setMenuVisible(false);
                  }}
                  title="Edit"
                />
                <Menu.Item onPress={() => deleteMedication()} title="Delete" />
              </Menu>
            )}
          />
        </Card.Content>
        <View style={styles.instructionChipsView}>{instructionChips}</View>
      </Card>
    </>
  );
}

export default MedicationCard;
