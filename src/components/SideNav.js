import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Conditions from "../screens/Conditions";
import BottomNav from "./BottomNav";
import Providers from "../screens/Providers";

const Drawer = createDrawerNavigator();

function SideNav() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={BottomNav} />
        <Drawer.Screen name="Providers" component={Providers} />
      </Drawer.Navigator>
    </>
  );
}

export default SideNav;
