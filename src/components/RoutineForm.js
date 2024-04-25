import { ScrollView, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RoutinesContext } from "../context/routines";
import { useContext, useEffect, useState } from "react";
import DropDown from "react-native-paper-dropdown";
import { InstructionsContext } from "../context/instructions";

function RoutineForm({ setRoutineFormVisible }) {
  const { routines, setRoutines } = useContext(RoutinesContext);
  const [instructionsList, setInstructionsList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const { instructions } = useContext(InstructionsContext);

  function assignInstructionsList(instructions) {
    const newList = [];
    for (const instruction of instructions) {
      console.log(instruction);
      // if no routine id, the instruction is available to be selected
      if (!instruction.routine_id) {
        newList.push({
          label: `${instruction.medication.name}, ${instruction.time}, ${instruction.dose}`,
          value: instruction.id,
        });
      }
    }
    setInstructionsList([newList]);
  }

  useEffect(() => {
    assignInstructionsList(instructions);
  }, []);

  //   useEffect(() => {
  //     console.log("fetching");

  //     fetch("http://127.0.0.1:5555/instructions").then((r) => {
  //       if (r.ok) {
  //         r.json().then((instructions) => {
  //           console.log(instructions);
  //           assignInstructionsList(instructions);
  //         });
  //       } else {
  //         r.json().then((err) => console.log(err));
  //       }
  //     });
  //   }, []);

  return (
    <View style={{ borderWidth: 1 }}>
      <ScrollView>
        <TextInput placeholder="Routine title" />
        <TextInput placeholder="Description" />
        {instructionsList.length ? (
          <DropDown
            label="Select medication instructions"
            list={instructionsList}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            // multiSelect={true}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

export default RoutineForm;
