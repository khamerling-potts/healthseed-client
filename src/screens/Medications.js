import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import styles from "../../styles";
import { AnimatedFAB } from "react-native-paper";
import MedicationCard from "../components/MedicationCard";
import { MedicationsContext } from "../context/medications";
import MedicationForm from "../components/MedicationForm";
import { InstructionsContext } from "../context/instructions";

function Medications() {
  const { medications, setMedications } = useContext(MedicationsContext);
  const { instructions, setInstructions } = useContext(InstructionsContext);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [FABExtended, setFABExtended] = useState(true);

  const medicationsToDisplay = medications
    .sort((a, b) => a.id - b.id)
    .map((medication) => (
      <MedicationCard medication={medication} key={medication.id} />
    ));

  return (
    <SafeAreaView style={styles.medicationsPage}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        {/* <Text>This is the Medications screen</Text> */}

        <ScrollView style={styles.medicationsScrollView}>
          {medicationsToDisplay}
        </ScrollView>

        {addFormVisible ? (
          <MedicationForm
            setAddFormVisible={setAddFormVisible}
            setFABExtended={setFABExtended}
            method="POST"
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
            setAddFormVisible(true);
          } else {
            setFABExtended(true);
            setAddFormVisible(false);
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
