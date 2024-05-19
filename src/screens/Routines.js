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
  const [currentRoutine, setCurrentRoutine] = useState(null);

  // Filter by time
  const routinesToDisplay = routines
    .filter((routine) => {
      if (times.length === 0) return true;
      if (!routine.times) return false;
      const commonTimes = routine.times.filter((time) => {
        return times.includes(time);
      });
      return commonTimes.length > 0;
    })
    .map((routine) => (
      <RoutineComponent
        key={routine.id}
        routine={routine}
        setCurrentRoutine={setCurrentRoutine}
        setFABExtended={setFABExtended}
        setRoutineFormVisible={setRoutineFormVisible}
      />
    ));

  return (
    <SafeAreaView style={styles.container}>
      {!routineFormVisible ? (
        <SegmentedButtons
          value={times}
          onValueChange={setTimes}
          multiSelect
          buttons={[
            {
              icon: "circle",
              value: "any time",
              label: "Any time",
              showSelectedCheck: true,
              checkedColor: "green",
              uncheckedColor: "green",
            },
            {
              icon: "circle",
              value: "morning",
              label: "Morning",
              showSelectedCheck: true,
              checkedColor: "goldenrod",
              uncheckedColor: "goldenrod",
            },
            {
              icon: "circle",
              value: "afternoon",
              label: "Afternoon",
              showSelectedCheck: true,
              checkedColor: "indianred",
              uncheckedColor: "indianred",
            },
            {
              icon: "circle",
              value: "evening",
              label: "Evening",
              showSelectedCheck: true,
              checkedColor: "indigo",
              uncheckedColor: "indigo",
            },
          ]}
        />
      ) : null}
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <ScrollView style={styles.routinesScrollView}>
          {routinesToDisplay}
        </ScrollView>
        {routineFormVisible ? (
          <RoutineForm
            setRoutineFormVisible={setRoutineFormVisible}
            setFABExtended={setFABExtended}
            routine={currentRoutine}
          />
        ) : null}
      </KeyboardAvoidingView>
      <AnimatedFAB
        icon={FABExtended ? "plus" : "minus"}
        label="New routine"
        extended={FABExtended}
        onPress={() => {
          if (FABExtended) {
            setFABExtended(false);
            setCurrentRoutine(null);
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
    </SafeAreaView>
  );
}

export default Routines;
