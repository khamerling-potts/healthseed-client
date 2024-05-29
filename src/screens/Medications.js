import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import styles from "../../styles";
import { AnimatedFAB } from "react-native-paper";
import MedicationCard from "../components/MedicationCard";
import { MedicationsContext } from "../context/medications";
import MedicationForm from "../components/MedicationForm";
import { InstructionsContext } from "../context/instructions";
import { RoutinesContext } from "../context/routines";

function Medications() {
  const { medications, setMedications } = useContext(MedicationsContext);
  const { instructions, setInstructions } = useContext(InstructionsContext);
  const [medicationFormVisible, setMedicationFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);
  const [currentMedication, setCurrentMedication] = useState(null);
  const { routines, setRoutines } = useContext(RoutinesContext);

  const medicationsToDisplay = medications
    .sort((a, b) => a.id - b.id)
    .map((medication) => (
      <MedicationCard
        medication={medication}
        key={medication.id}
        setMedicationFormVisible={setMedicationFormVisible}
        setFABExtended={setFABExtended}
        setCurrentMedication={setCurrentMedication}
      />
    ));

  return (
    <SafeAreaView style={styles.medicationsPage}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <ScrollView style={styles.medicationsScrollView}>
          {medicationsToDisplay}
        </ScrollView>

        {medicationFormVisible ? (
          <MedicationForm
            setMedicationFormVisible={setMedicationFormVisible}
            setFABExtended={setFABExtended}
            method="POST"
            medication={currentMedication}
          />
        ) : null}
      </KeyboardAvoidingView>
      <AnimatedFAB
        icon={FABExtended ? "plus" : "minus"}
        label="New medication"
        extended={FABExtended}
        onPress={() => {
          if (FABExtended) {
            setFABExtended(false);
            setCurrentMedication(null);
            setMedicationFormVisible(true);
          } else {
            setFABExtended(true);
            setMedicationFormVisible(false);
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

export default Medications;
