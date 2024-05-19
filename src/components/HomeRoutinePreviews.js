import { Surface, Text, Icon } from "react-native-paper";
import { View } from "react-native";
import styles from "../../styles";

function HomeRoutinePreviews({
  morningRoutines,
  afternoonRoutines,
  eveningRoutines,
  anytimeRoutines,
}) {
  return (
    <>
      <Surface style={styles.homeRoutinePreviews}>
        <>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon source={"weather-sunset"} />
            <Text
              variant="titleMedium"
              style={styles.homeRoutinesText}
            >{`${morningRoutines.length} morning routine(s)`}</Text>
          </View>

          {morningRoutines.length ? (
            <Text>
              {`Including ${afternoonRoutines.slice(0, 4).join(", ")}...`}
            </Text>
          ) : null}
        </>
      </Surface>

      <Surface style={styles.homeRoutinePreviews}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source={"weather-sunny"} />
          <Text
            variant="titleMedium"
            style={styles.homeRoutinesText}
          >{`${afternoonRoutines.length} afternoon routine(s)`}</Text>
        </View>
        {afternoonRoutines.length ? (
          <Text>{`Including ${afternoonRoutines
            .slice(0, 4)
            .join(", ")}...`}</Text>
        ) : null}
      </Surface>

      <Surface style={styles.homeRoutinePreviews}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source={"weather-night"} />
          <Text
            variant="titleMedium"
            style={styles.homeRoutinesText}
          >{`${eveningRoutines.length} evening routine(s)`}</Text>
        </View>
        {eveningRoutines.length ? (
          <Text>{`Including ${eveningRoutines
            .slice(0, 4)
            .join(", ")}...`}</Text>
        ) : null}
      </Surface>

      <Surface style={styles.homeRoutinePreviews}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source={"circle"} />
          <Text variant="titleMedium" style={styles.homeRoutinesText}>
            {`${anytimeRoutines.length} routine(s) to complete at any time`}
          </Text>
        </View>
        {anytimeRoutines.length ? (
          <Text>{`Including ${anytimeRoutines
            .slice(0, 4)
            .join(", ")}...`}</Text>
        ) : null}
      </Surface>
    </>
  );
}

export default HomeRoutinePreviews;
