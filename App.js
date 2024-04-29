import "react-native-gesture-handler";
import { UserProvider } from "./src/context/user";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppWrapper from "./src/components/AppWrapper";
import { PaperProvider } from "react-native-paper";
import { ConditionsProvider } from "./src/context/conditions";
import { ProvidersProvider } from "./src/context/providers";
import { MedicationsProvider } from "./src/context/medications";
import { InstructionsProvider } from "./src/context/instructions";
import { RoutinesProvider } from "./src/context/routines";
import "react-native-get-random-values";

export default function App() {
  // const { user, setUser } = useContext(UserContext);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <NativeRouter> */}
          <UserProvider>
            <ConditionsProvider>
              <ProvidersProvider>
                <MedicationsProvider>
                  <InstructionsProvider>
                    <RoutinesProvider>
                      <AppWrapper />
                    </RoutinesProvider>
                  </InstructionsProvider>
                </MedicationsProvider>
              </ProvidersProvider>
            </ConditionsProvider>
          </UserProvider>
          {/* </NativeRouter> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
