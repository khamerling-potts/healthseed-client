import "react-native-gesture-handler";
import { UserProvider } from "./src/context/user";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DefaultTheme as DefaultNavTheme,
  NavigationContainer,
} from "@react-navigation/native";
import AppWrapper from "./src/components/AppWrapper";
import {
  PaperProvider,
  DefaultTheme as DefaultPaperTheme,
} from "react-native-paper";
import { ConditionsProvider } from "./src/context/conditions";
import { ProvidersProvider } from "./src/context/providers";
import { MedicationsProvider } from "./src/context/medications";
import { InstructionsProvider } from "./src/context/instructions";
import { RoutinesProvider } from "./src/context/routines";
import { AppointmentsProvider } from "./src/context/appointments";
import { LoginMethodProvider } from "./src/context/loginmethod";

import "react-native-get-random-values";

export default function App() {
  // const { user, setUser } = useContext(UserContext);
  const navTheme = DefaultNavTheme;
  navTheme.colors.background = "white";

  const paperTheme = {
    ...DefaultPaperTheme,
    colors: {
      primary: "#597683",
      ...DefaultPaperTheme.colors,
      primaryContainer: "#C6E1B5",
      onPrimaryContainer: "#2C4438",
      surfaceVariant: "#DCE4E8",
      onSurfaceVariant: "#40484B",
      elevation: {
        ...DefaultPaperTheme.colors.elevation,
        level1: "#F2F7F6",
      },
    },
  };
  console.log(paperTheme);

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          {/* <NativeRouter> */}
          <UserProvider>
            <ConditionsProvider>
              <ProvidersProvider>
                <MedicationsProvider>
                  <InstructionsProvider>
                    <RoutinesProvider>
                      <AppointmentsProvider>
                        <LoginMethodProvider>
                          <AppWrapper />
                        </LoginMethodProvider>
                      </AppointmentsProvider>
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
