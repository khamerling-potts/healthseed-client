import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Conditions from "./src/screens/Conditions";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/conditions" element={<Conditions />} />
    </Routes>
  );
};

export default RoutesComponent;
