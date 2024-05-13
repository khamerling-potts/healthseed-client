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
import { AppointmentsContext } from "../context/appointments";
import { useContext, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../styles";
import { ProvidersContext } from "../context/providers";
import DateTimePicker from "@react-native-community/datetimepicker";
// import Clipboard from "@react-native-clipboard/clipboard";
import * as Clipboard from "expo-clipboard";

function AppointmentForm({ setApptFormVisible, setFABExtended, appointment }) {
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { providers, setProviders } = useContext(ProvidersContext);
  const [showProviderDropDown, setShowProviderDropDown] = useState(false);
  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);

  const [suggestedAddress, setSuggestedAddress] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  console.log(appointment);

  //date conversion practice
  console.log("before formatting ", new Date());
  const IsoDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log("to string ", IsoDate);
  const converted = new Date(IsoDate + "Z");
  console.log("back to date ", converted);

  const [datetime, setDateTime] = useState(
    appointment ? new Date(appointment.datetime + "Z") : new Date()
  );
  const [providerDropDownValue, setProviderDropDownValue] = useState(
    appointment && appointment.provider ? appointment.provider_id : null
  );
  const [providersList, setProvidersList] = useState(
    assignProvidersList(providers)
  );
  const [categoryDropDownValue, setCategoryDropDownValue] = useState(
    appointment ? appointment.category : null
  );
  const [categoryList, setCategoryList] = useState([
    { label: "Medical", value: "Medical" },
    { label: "Vision", value: "Vision" },
    { label: "Dental", value: "Dental" },
    { label: "Mental Health", value: "Mental Health" },
    { label: "Fitness/Wellness", value: "Fitness/Wellness" },
    { label: "Other", value: "Other" },
  ]);

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

  const onDateTimeChange = (event, selectedDateTime) => {
    setDateTime(selectedDateTime);
  };

  const validationSchema = Yup.object().shape({
    location: Yup.string().required("Required"),
  });

  function handleEditAppointment(editedAppointment) {
    const updatedAppointments = appointments.filter(
      (appt) => appt.id !== editedAppointment.id
    );
    setAppointments([...updatedAppointments, editedAppointment]);
  }

  //Used to set the suggested address to the selected provider's address
  function onDropDownChange(value) {
    const provider_id = value;
    const provider = providers.find((provider) => provider.id === provider_id);
    setSuggestedAddress(provider.address);
    setSnackbarVisible(true);
  }

  return (
    <View style={{ borderWidth: 1 }}>
      <ScrollView style={styles.formScrollView}>
        <Formik
          initialValues={{
            location: appointment ? appointment.location : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const configObj = {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                {
                  ...values,
                  // formatting datetime for backend database
                  datetime: datetime
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
                  category: categoryDropDownValue,
                  provider_id: providerDropDownValue,
                },
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
              <DateTimePicker
                testID="dateTimePicker"
                value={datetime}
                mode={"datetime"}
                is24Hour={true}
                onChange={onDateTimeChange}
              />
              <HelperText
                visible={!!(touched.datetime && errors.datetime)}
                type="error"
                style={styles.helperText}
              >
                {errors.datetime}
              </HelperText>

              <DropDownPicker
                placeholder="Select a category..."
                open={showCategoryDropDown}
                value={categoryDropDownValue}
                items={categoryList}
                setOpen={setShowCategoryDropDown}
                setValue={setCategoryDropDownValue}
                setItems={setCategoryList}
                multiple={false}
                mode="BADGE"
                extendableBadgeContainer={true}
                listMode="SCROLLVIEW"
                zIndex={3000}
                zIndexInverse={1000}
              />
              <HelperText />
              <DropDownPicker
                placeholder="Select one of your providers..."
                open={showProviderDropDown}
                value={providerDropDownValue}
                items={providersList}
                setOpen={setShowProviderDropDown}
                setValue={setProviderDropDownValue}
                onChangeValue={(value) => onDropDownChange(value)}
                setItems={setProvidersList}
                multiple={false}
                mode="BADGE"
                extendableBadgeContainer={true}
                listMode="SCROLLVIEW"
                zIndex={1000}
                zIndexInverse={3000}
              />
              <HelperText />

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

              <Button onPress={handleSubmit}>Save</Button>
            </>
          )}
        </Formik>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        wrapperStyle={{ bottom: 10 }}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Copy",
          onPress: () => {
            Clipboard.setStringAsync(suggestedAddress);
          },
        }}
        onIconPress={() => {
          setSnackbarVisible(false);
        }}
        duration={Snackbar.DURATION_LONG}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>
          Suggested address:
          <Text style={{ fontWeight: "normal", color: "white" }}>
            {" " + suggestedAddress}
          </Text>
        </Text>
      </Snackbar>
      <Text />
    </View>
  );
}

export default AppointmentForm;
