import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import styles from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { MedicationsContext } from "../context/medications";

function MedicationCard({ medication }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { medications, setMedications } = useContext(MedicationsContext);
  const id = medication.id;

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

  function handleEditMedication(editedMedication) {
    const updatedMedications = medications.filter(
      (medication) => medication.id !== editedMedication.id
    );
    setMedications([...updatedMedications, editedMedication]);
  }

  const formik = useFormik({
    initialValues: {
      name: medication.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
    }),
    onSubmit: (values) => {
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
            console.log(medication);
            handleEditMedication(medication);
            setModalVisible(false);
          });
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    },
  });

  return (
    <>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.formModal}
        >
          <TextInput
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
          />
          <Button onPress={formik.handleSubmit}>Save</Button>
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
      </Card>
    </>
  );
}

export default MedicationCard;
