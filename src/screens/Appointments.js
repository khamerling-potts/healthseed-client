import { Text, SegmentedButtons } from "react-native-paper";
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
  const [view, setView] = useState("upcoming");

  // Filter out future appointments and order starting with soonest date
  const upcomingAppointments = appointments
    .filter((appt) => new Date(appt.datetime + "Z") - new Date() >= 0)
    .sort((a, b) => new Date(a.datetime + "Z") - new Date(b.datetime + "Z"))
    .map((appt) => (
      <AppointmentCard
        key={appt.id}
        appointment={appt}
        setApptFormVisible={setApptFormVisible}
        setFABExtended={setFABExtended}
        setCurrentAppt={setCurrentAppt}
      />
    ));

  // Filter out past appointments and order starting with most recent
  const pastAppointments = appointments
    .filter((appt) => new Date(appt.datetime + "Z") - new Date() < 0)
    .sort((a, b) => new Date(b.datetime + "Z") - new Date(a.datetime + "Z"))
    .map((appt) => (
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
      {!apptFormVisible ? (
        <SegmentedButtons
          value={view}
          onValueChange={setView}
          style={styles.apptFilterButton}
          buttons={[
            {
              value: "upcoming",
              label: "Upcoming",
              showSelectedCheck: true,
            },
            {
              value: "past",
              label: "Past",
              showSelectedCheck: true,
            },
          ]}
        />
      ) : null}

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <ScrollView style={styles.apptsScrollView}>
          {view === "upcoming" ? upcomingAppointments : pastAppointments}
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
