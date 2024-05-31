import { Surface, Text, Icon } from "react-native-paper";
import { View } from "react-native";
import styles from "../../styles";

function HomeRoutinePreview({ routines, time }) {
  const icons = {
    morning: "weather-sunset",
    afternoon: "weather-sunny",
    evening: "weather-night",
    "any time": "circle-outline",
  };
  const iconColors = {
    "any time": "green",
    morning: "goldenrod",
    afternoon: "indianred",
    evening: "indigo",
  };
  return (
    <Surface style={styles.homeRoutinePreviews}>
      <>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source={icons[time]} size={16} color={iconColors[time]} />
          <Text variant="titleMedium" style={styles.homeRoutinesText}>
            {time !== "any time"
              ? ` ${routines.length} ${time} routine${
                  routines.length === 1 ? "" : "s"
                }`
              : ` ${routines.length} routine${
                  routines.length === 1 ? "" : "s"
                } to complete at any time`}
          </Text>
        </View>

        {routines.length ? (
          <Text>
            Including{" "}
            <Text style={{ fontWeight: "bold", color: "#674E82" }}>
              {routines.slice(0, 4).join(", ")}
            </Text>
          </Text>
        ) : null}
      </>
    </Surface>
  );
}

export default HomeRoutinePreview;
