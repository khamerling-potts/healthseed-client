import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default RoutesComponent;
