import { Text } from "react-native-paper";
import { AppointmentsContext } from "../context/appointments";
import { useContext, useState } from "react";
import { View } from "react-native";
import styles from "../../styles";
import AppointmentForm from "../components/AppointmentForm";
import { SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import AppointmentCard from "../components/AppointmentCard";

function Appointments() {
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const [apptFormVisible, setApptFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);
  const [currentAppt, setCurrentAppt] = useState(null);

  const appointmentsToDisplay = appointments.map((appt) => (
    <AppointmentCard
      key={appt.id}
      appointment={appt}
      setApptFormVisible={setApptFormVisible}
      setFABExtended={setFABExtended}
      setCurrentAppt={setCurrentAppt}
    />
  ));
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <ScrollView style={styles.apptsScrollView}>
          {appointmentsToDisplay}
        </ScrollView>
        {apptFormVisible ? (
          <AppointmentForm
            setApptFormVisible={setApptFormVisible}
            setFABExtended={setFABExtended}
            appointment={currentAppt}
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
            setCurrentAppt(null);
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
