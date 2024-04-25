import { ScrollView, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RoutinesContext } from "../context/routines";
import { useContext, useEffect, useState } from "react";
import DropDown from "react-native-paper-dropdown";

function RoutineForm({ setRoutineFormVisible }) {
  const { routines, setRoutines } = useContext(RoutinesContext);
  const [instructionsList, setInstructionsList] = useState([]);

  function assignInstructionsList(instructions) {
    for (instruction of instructions) {
      // if no routine id, the instruction is available to be selected
      if (!instruction.routine_id) {
        instructionsList.push(instruction);
      }
    }
    setInstructionsList([...instructionsList]);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5555/instructions").then((r) => {
      if (r.ok) {
        r.json().then((instructions) => {
          assignInstructionsList(instructions);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  return (
    <View style={{ borderWidth: 1 }}>
      <ScrollView>
        <TextInput placeholder="Routine title" />
        <TextInput placeholder="Description" />
        <DropDown label="Select medication instructions" />
      </ScrollView>
    </View>
  );
}

export default RoutineForm;
