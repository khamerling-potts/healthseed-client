import {
  Button,
  Card,
  Text,
  AnimatedFAB,
  SegmentedButtons,
} from "react-native-paper";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { RoutinesContext } from "../context/routines";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import styles from "../../styles";
import RoutineForm from "../components/RoutineForm";
import RoutineComponent from "../components/RoutineComponent";

function Routines() {
  const { routines, setRoutines } = useContext(RoutinesContext);
  const [routineFormVisible, setRoutineFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/routines").then((r) => {
      if (r.ok) {
        r.json().then((routines) => setRoutines(routines));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  // Filter by time
  const routinesToDisplay = routines
    .filter((routine) => {
      if (times.length === 0) return true;
      if (!routine.times) return false;
      const commonTimes = routine.times.filter((time) => {
        console.log(time);
        return times.includes(time);
      });
      return commonTimes.length > 0;
    })
    .map((routine) => <RoutineComponent key={routine.id} routine={routine} />);

  return (
    <SafeAreaView style={styles.routinesPage}>
      <AnimatedFAB
        icon={FABExtended ? "plus" : "minus"}
        label="New routine"
        extended={FABExtended}
        onPress={() => {
          if (FABExtended) {
            setFABExtended(false);
            setRoutineFormVisible(true);
          } else {
            setFABExtended(true);
            setRoutineFormVisible(false);
          }
        }}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={styles.addFAB}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={110}
        style={{ maxHeight: "95%" }}
      >
        <SegmentedButtons
          value={times}
          onValueChange={setTimes}
          multiSelect
          buttons={[
            {
              value: "any time",
              label: "Any time",
              showSelectedCheck: true,
            },
            {
              value: "morning",
              label: "Morning",
              showSelectedCheck: true,
            },
            {
              value: "afternoon",
              label: "Afternoon",
              showSelectedCheck: true,
            },
            {
              value: "evening",
              label: "Evening",
              // style: styles.button,
              showSelectedCheck: true,
            },
          ]}
        />
        <ScrollView style={styles.medicationsScrollView}>
          {routinesToDisplay}
        </ScrollView>

        {routineFormVisible ? (
          <RoutineForm
            setRoutineFormVisible={setRoutineFormVisible}
            setFABExtended={setFABExtended}
          />
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Routines;
