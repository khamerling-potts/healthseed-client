import { Text } from "react-native-paper";
import { AppointmentsContext } from "../context/appointments";
import { useContext } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

function Appointments() {
  const { appointments, setAppointments } = useContext(AppointmentsContext);

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Appointments;
