import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screens/Home";
import Conditions from "../screens/Conditions";
import Profile from "../screens/Profile";
import Providers from "../screens/Providers";
import { useRoute } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

function BottomNav() {
  // const route = useRoute();
  // console.log(route.name);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: "#fff380" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Conditions"
        component={Conditions}
        options={{
          tabBarLabel: "Conditions",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart-plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNav;
