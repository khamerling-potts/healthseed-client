import { Chip } from "react-native-paper";
import styles from "../../styles";
import { useContext, useState } from "react";
import EditInstructionForm from "./EditInstructionForm";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Modal, Portal } from "react-native-paper";
import {
  MedicationsContext,
  MedicationsProvider,
} from "../context/medications";

function InstructionChip({ instruction }) {
  const icons = {
    morning: "weather-sunset",
    afternoon: "weather-sunny",
    evening: "weather-night",
  };
  const [editFormVisible, setEditFormVisible] = useState(false);
  const { medications, setMedications } = useContext(MedicationsContext);
  return (
    <>
      <Chip
        icon={icons[instruction.time]}
        onPress={() => {
          setEditFormVisible(true);
        }}
        style={styles.instructionChip}
      >
        {instruction.dose}
      </Chip>
      <Portal>
        <Modal
          visible={editFormVisible}
          onDismiss={() => setEditFormVisible(false)}
          contentContainerStyle={styles.formModal}
        >
          <EditInstructionForm
            instruction={instruction}
            setEditFormVisible={setEditFormVisible}
            medications={medications}
            setMedications={setMedications}
          />
        </Modal>
      </Portal>
    </>
  );
}

export default InstructionChip;
