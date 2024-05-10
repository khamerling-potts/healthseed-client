import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Conditions from "../screens/Conditions";
import BottomNav from "./BottomNav";
import Providers from "../screens/Providers";
import Medications from "../screens/Medications";
import Routines from "../screens/Routines";
import Appointments from "../screens/Appointments";
import styles from "../../styles";
import { Icon } from "react-native-paper";

const Drawer = createDrawerNavigator();

function SideNav() {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: "#819ba6" },
          drawerActiveTintColor: "#ffffff",
          drawerInactiveTintColor: "black",
          headerTintColor: "#ffffff",
        }}
      >
        <Drawer.Screen
          name="Healthseed"
          component={BottomNav}
          options={styles.pageHeader}
        />
        <Drawer.Screen
          name="Providers"
          component={Providers}
          options={styles.pageHeader}
        />
        <Drawer.Screen
          name="Medications"
          component={Medications}
          options={styles.pageHeader}
        />
        <Drawer.Screen
          name="Routines"
          component={Routines}
          options={styles.pageHeader}
        />
        <Drawer.Screen
          name="Appointments"
          component={Appointments}
          options={styles.pageHeader}
        />
      </Drawer.Navigator>
    </>
  );
}

export default SideNav;
