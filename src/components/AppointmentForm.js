import { ScrollView, View } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  SegmentedButtons,
  Text,
  Badge,
} from "react-native-paper";
import { AppointmentsContext } from "../context/appointments";
import { useContext, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../styles";
import { ProvidersContext } from "../context/providers";

function AppointmentForm({ setApptFormVisible, setFABExtended, appointment }) {
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { providers, setProviders } = useContext(ProvidersContext);
  const [showDropDown, setShowDropDown] = useState(false);

  const [dropDownValue, setDropDownValue] = useState(
    appointments && appointments.providers
      ? appointments.providers.map((provider) => `${provider.id}`)
      : []
  );
  const [providersList, setProvidersList] = useState(
    assignProvidersList(providers)
  );

  //conditionally assigning fetch properties based on whether adding or editing appt
  const URL = appointment
    ? `http://127.0.0.1:5555/appointments${"/" + appointment.id}`
    : `http://127.0.0.1:5555/appointments`;
  const method = appointment ? "PATCH" : "POST";

  function assignProvidersList(providers) {
    const newList = [];
    for (const provider of providers) {
      newList.push({
        label: provider.name,
        value: provider.id,
      });
    }
    return newList;
  }

  const validate = (values) => {
    const errors = {};
    //datetime validation
    if (!values.datetime) {
      errors.datetime = "Required";
    }
    // category validation
    if (!values.category) {
      errors.category = "Required";
    }
    // location validation
    if (!values.location) {
      errors.location = "Required";
    }

    return errors;
  };

  const validationSchema = Yup.object().shape({
    datetime: Yup.string().required("Required"),
    category: Yup.string()
      .oneOf(
        ["Medical", "Vision", "Dental", "Mental Health", "Fitness/Wellness"],
        "Must be one of these"
      )
      .required("Required"),
    location: Yup.string().required("Required"),
  });

  function handleEditAppointment(editedAppointment) {
    const updatedAppointments = appointments.filter(
      (appt) => appt.id !== editedAppointment.id
    );
    setAppointments([...updatedAppointments, editedAppointment]);
  }

  return (
    <View style={{ borderWidth: 1 }}>
      <ScrollView>
        <Formik
          initialValues={{
            category: appointment ? appointment.category : "",
            location: appointment ? appointment.location : "",
            datetime: appointment ? appointment.datetime : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const configObj = {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                { ...values, provider_ids: dropDownValue },
                null,
                2
              ),
            };
            fetch(URL, configObj).then((r) => {
              if (r.ok) {
                r.json().then((appt) => {
                  if (method === "POST") {
                    setAppointments([...appointments, appt]);
                  } else {
                    handleEditAppointment(appt);
                  }
                  setApptFormVisible(false);
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
                placeholder="Select a date and time"
                onChangeText={handleChange("datetime")}
                onBlur={handleBlur("datetime")}
                value={values.datetime}
              />
              <HelperText
                visible={!!(touched.datetime && errors.datetime)}
                type="error"
                style={styles.helperText}
              >
                {errors.datetime}
              </HelperText>
              <TextInput
                placeholder="Category"
                onChangeText={handleChange("category")}
                onBlur={handleBlur("category")}
                value={values.category}
              />
              <HelperText
                visible={!!(touched.category && errors.category)}
                type="error"
                style={styles.helperText}
              >
                {errors.category}
              </HelperText>
              <TextInput
                placeholder="Location"
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                value={values.location}
              />
              <HelperText
                visible={!!(touched.location && errors.location)}
                type="error"
                style={styles.helperText}
              >
                {errors.location}
              </HelperText>
              <DropDownPicker
                placeholder="Add provider"
                open={showDropDown}
                value={dropDownValue}
                items={providersList}
                setOpen={setShowDropDown}
                setValue={setDropDownValue}
                setItems={setProvidersList}
                multiple={false}
                mode="BADGE"
                extendableBadgeContainer={true}
                listMode="SCROLLVIEW"
              />
              <Button onPress={handleSubmit}>Save</Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default AppointmentForm;
