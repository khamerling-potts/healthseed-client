import { Text } from "react-native-paper";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { RoutinesContext } from "../context/routines";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import styles from "../../styles";

function Routines() {
  const { routines, setRoutines } = useContext(RoutinesContext);
  const [routineFormVisible, setRoutineFormVisible] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/routines").then((r) => {
      if (r.ok) {
        r.json().then((routines) => setRoutines(routines));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  const routinesToDisplay = routines.map((routine) => (
    <Text key={routine.id}>
      `${routine.title}: {routine.notes}`
    </Text>
  ));

  return (
    <SafeAreaView style={styles.medicationsPage}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <ScrollView style={styles.medicationsScrollView}>
          {routinesToDisplay}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Routines;
