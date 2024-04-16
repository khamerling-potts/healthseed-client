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
  Avatar,
  IconButton,
  Menu,
  PaperProvider,
} from "react-native-paper";
import { ConditionsContext } from "../context/conditions";

function ConditionCard({ condition }) {
  const [menuVisible, setMenuVisible] = useState(false);
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

  return (
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
              <Menu.Item onPress={() => {}} title="Edit" />
              <Menu.Item onPress={() => deleteCondition()} title="Delete" />
            </Menu>
          )}
        />
      </Card.Content>
    </Card>
  );
}

export default ConditionCard;
