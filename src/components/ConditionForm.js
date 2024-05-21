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
    ? `http://127.0.0.1:5555/conditions${"/" + condition.id}`
    : `http://127.0.0.1:5555/conditions`;
  const method = condition ? "PATCH" : "POST";

  function handleEditCondition(editedCondition) {
    const updatedConditions = conditions.filter(
      (condition) => condition.id !== editedCondition.id
    );
    setConditions([...updatedConditions, editedCondition]);
  }

  return (
    <View style={{ borderWidth: 1 }}>
      <ScrollView style={styles.formScrollView}>
        <Formik
          initialValues={{
            description: condition ? condition.description : "",
          }}
          validationSchema={Yup.object({
            description: Yup.string().required("Description required"),
          })}
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
              <TextInput
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                placeholder="Enter condition description here"
              ></TextInput>
              <HelperText
                visible={!!(touched.description && errors.description)}
                type="error"
                style={styles.helperText}
              >
                {errors.description}
              </HelperText>

              <Button onPress={handleSubmit}>Save</Button>
            </>
          )}
        </Formik>
      </ScrollView>

      <Text />
    </View>
  );
}

export default ConditionForm;
