import { Chip } from "react-native-paper";

function InstructionChip({ instruction }) {
  const icons = {
    morning: "weather-sunset",
    afternoon: "weather-sunny",
    evening: "weather-night",
  };
  return (
    <Chip icon={icons[instruction.time]} onPress={() => {}}>
      {instruction.dose}
    </Chip>
  );
}

export default InstructionChip;
