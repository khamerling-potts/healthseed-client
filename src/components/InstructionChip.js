import { Chip } from "react-native-paper";
import styles from "../../styles";
import { useContext, useState } from "react";
import InstructionForm from "./InstructionForm";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Modal, Portal } from "react-native-paper";
import {
  MedicationsContext,
  MedicationsProvider,
} from "../context/medications";

function InstructionChip({ instruction, page }) {
  const icons = {
    morning: "weather-sunset",
    afternoon: "weather-sunny",
    evening: "weather-night",
  };
  const [instructionFormVisible, setInstructionFormVisible] = useState(false);
  const { medications, setMedications } = useContext(MedicationsContext);
  return (
    <>
      <Chip
        icon={!(page === "routines") ? icons[instruction.time] : null}
        onPress={() => {
          if (page === "medications") {
            setInstructionFormVisible(true);
          }
        }}
        style={styles.instructionChip}
      >
        {instruction.dose}
        {page === "routines" ? " " + instruction.medication.name : null}
      </Chip>
      <Portal>
        <Modal
          visible={instructionFormVisible}
          onDismiss={() => setInstructionFormVisible(false)}
          contentContainerStyle={styles.formModal}
        >
          <InstructionForm
            instruction={instruction}
            medication={instruction.medication}
            setInstructionFormVisible={setInstructionFormVisible}
            medications={medications}
            setMedications={setMedications}
          />
        </Modal>
      </Portal>
    </>
  );
}

export default InstructionChip;
