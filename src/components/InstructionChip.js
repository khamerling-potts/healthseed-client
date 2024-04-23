import { Chip } from "react-native-paper";
import styles from "../../styles";

function InstructionChip({ instruction }) {
  const icons = {
    morning: "weather-sunset",
    afternoon: "weather-sunny",
    evening: "weather-night",
  };
  return (
    <Chip
      icon={icons[instruction.time]}
      onPress={() => {
        console.log("pressed");
      }}
      compact
      style={styles.instructionChip}
    >
      {instruction.dose}
    </Chip>
  );
}

export default InstructionChip;
