import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextComponent,
  KeyboardAvoidingView,
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

function ConditionCard({
  condition,
  setConditionFormVisible,
  setFABExtended,
  setCurrentCondition,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { conditions, setConditions } = useContext(ConditionsContext);
  const id = condition.id;

  function onDeleteCondition() {
    fetch(
      `https://healthseed-flask-backend-94c8efc27481.herokuapp.com/conditions/${condition.id}`,
      {
        method: "DELETE",
      }
    ).then((r) => {
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
          titleNumberOfLines={0}
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
                  setConditionFormVisible(true);
                  setFABExtended(false);
                  setCurrentCondition(condition);
                }}
                title="Edit"
                leadingIcon="pencil"
              />
              <Menu.Item
                onPress={() => onDeleteCondition()}
                title="Delete"
                leadingIcon="delete"
              />
            </Menu>
          )}
        />
      </Card.Content>
    </Card>
  );
}

export default ConditionCard;
