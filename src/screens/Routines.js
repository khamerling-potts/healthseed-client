import { Button, Card, Text, AnimatedFAB } from "react-native-paper";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { RoutinesContext } from "../context/routines";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import styles from "../../styles";
import RoutineForm from "../components/RoutineForm";

function Routines() {
  const { routines, setRoutines } = useContext(RoutinesContext);
  const [routineFormVisible, setRoutineFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);

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
    <Card key={routine.id} style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Card.Title
          title={`${routine.title}: ${routine.notes}, ${routine.instructions[0].medication.name}`}
        />
      </Card.Content>
    </Card>
  ));

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
        <ScrollView style={styles.medicationsScrollView}>
          {routinesToDisplay}
          <Card style={styles.card}>
            <Card.Content>
              <Card.Title title="example routine card" />
            </Card.Content>
          </Card>
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
