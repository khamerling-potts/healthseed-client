import { Text } from "react-native-paper";
import { AppointmentsContext } from "../context/appointments";
import { useContext, useState } from "react";
import { View } from "react-native";
import styles from "../../styles";
import AppointmentForm from "../components/AppointmentForm";
import { SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import { AnimatedFAB } from "react-native-paper";

function Appointments() {
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const [apptFormVisible, setApptFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);

  const appointmentsToDisplay = appointments.map((appt) => (
    <View key={appt.id}>
      <Text>{appt.datetime}</Text>
      <Text>{appt.location}</Text>
      <Text>{appt.provider.name}</Text>
      <Text>{appt.category}</Text>
    </View>
  ));
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <ScrollView style={styles.medicationsScrollView}>
          {appointmentsToDisplay}
        </ScrollView>
        {apptFormVisible ? (
          <AppointmentForm
            setApptFormVisible={setApptFormVisible}
            setFABExtended={setFABExtended}
            method="POST"
          />
        ) : null}
      </KeyboardAvoidingView>
      <AnimatedFAB
        icon={FABExtended ? "calendar" : "minus"}
        label="Log appointment"
        extended={FABExtended}
        onPress={() => {
          if (FABExtended) {
            setFABExtended(false);
            setApptFormVisible(true);
          } else {
            setFABExtended(true);
            setApptFormVisible(false);
          }
        }}
        // visible={visible}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={styles.addFAB}
      />
    </SafeAreaView>
  );
}

export default Appointments;
