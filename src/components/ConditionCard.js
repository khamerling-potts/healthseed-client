import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextComponent,
} from "react-native";
import { UserContext, UserProvider } from "../context/user";
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import styles from "../../styles";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  TextInput,
  Button,
  Card,
  IconButton,
  Menu,
  Modal,
  Portal,
} from "react-native-paper";
import { ConditionsContext } from "../context/conditions";

function ConditionCard({ condition }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { conditions, setConditions } = useContext(ConditionsContext);
  const id = condition.id;

  //   function editCondition(){

  //   }

  function deleteCondition() {
    fetch(`http://127.0.0.1:5555/conditions/${condition.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setConditions(conditions.filter((condition) => condition.id !== id));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  function handleEditCondition(editedCondition) {
    const updatedConditions = conditions.filter(
      (condition) => condition.id !== editedCondition.id
    );
    setConditions([...updatedConditions, editedCondition]);
  }

  const formik = useFormik({
    initialValues: {
      description: condition.description,
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description required"),
    }),
    onSubmit: (values) => {
      const configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      };
      fetch(`http://127.0.0.1:5555/conditions/${condition.id}`, configObj).then(
        (r) => {
          if (r.ok) {
            r.json().then((condition) => {
              console.log(condition);
              handleEditCondition(condition);
              setModalVisible(false);
            });
          } else {
            r.json().then((err) => console.log(err));
          }
        }
      );
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
            onChangeText={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            value={formik.values.description}
          />
          <Button onPress={formik.handleSubmit}>Save</Button>
        </Modal>
      </Portal>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Card.Title
            title={condition.description}
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
                <Menu.Item onPress={() => deleteCondition()} title="Delete" />
              </Menu>
            )}
          />
        </Card.Content>
      </Card>
    </>
  );
}

export default ConditionCard;
