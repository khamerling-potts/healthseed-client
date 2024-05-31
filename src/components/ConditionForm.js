import { ScrollView, View } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  SegmentedButtons,
  Text,
  Badge,
  Snackbar,
} from "react-native-paper";
import { ConditionsContext } from "../context/conditions";
import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../styles";

function ConditionForm({ setConditionFormVisible, setFABExtended, condition }) {
  const { conditions, setConditions } = useContext(ConditionsContext);

  const URL = condition
    ? `https://healthseed-flask-backend-94c8efc27481.herokuapp.com/conditions${
        "/" + condition.id
      }`
    : `https://healthseed-flask-backend-94c8efc27481.herokuapp.com/conditions`;
  const method = condition ? "PATCH" : "POST";

  function handleEditCondition(editedCondition) {
    const updatedConditions = conditions.filter(
      (condition) => condition.id !== editedCondition.id
    );
    setConditions([...updatedConditions, editedCondition]);
  }

  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description required"),
  });

  return (
    <View style={styles.formView}>
      <ScrollView
        style={styles.formScrollView}
        contentContainerStyle={{
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Formik
          initialValues={{
            description: condition ? condition.description : "",
          }}
          validationSchema={validationSchema}
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
                r.json().then((condition) => {
                  if (method === "POST") {
                    setConditions([...conditions, condition]);
                  } else {
                    handleEditCondition(condition);
                  }
                  setConditionFormVisible(false);
                  setFABExtended(true);
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
                style={{ marginBottom: 20, textAlign: "center" }}
              >
                {condition
                  ? "Edit condition description below:"
                  : "Fill out condition description below"}
              </Text>
              <TextInput
                label="Condition description"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                placeholder="e.g. Type II Diabetes, Arthritis..."
                activeUnderlineColor="#597683"
                style={{ width: "100%" }}
              ></TextInput>
              <HelperText
                visible={!!(touched.description && errors.description)}
                type="error"
                style={styles.helperText}
              >
                {errors.description}
              </HelperText>

              <Button
                onPress={handleSubmit}
                style={{ ...styles.saveButton, marginTop: 0 }}
                textColor="#fafafa"
              >
                Save
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>

      <Text />
    </View>
  );
}

export default ConditionForm;
