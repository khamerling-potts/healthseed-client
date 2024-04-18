import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Conditions from "../screens/Conditions";
import BottomNav from "./BottomNav";
import Providers from "../screens/Providers";
import Medications from "../screens/Medications";

const Drawer = createDrawerNavigator();

function SideNav() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="Healthseed" component={BottomNav} />
        <Drawer.Screen name="Providers" component={Providers} />
        <Drawer.Screen name="Medications" component={Medications} />
      </Drawer.Navigator>
    </>
  );
}

export default SideNav;
