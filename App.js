import React from "react";
import { YellowBox } from "react-native";

import AppNavigator from "./routes";

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader requires",
  "Class RCTCxxModule"
]);

export default function App() {
  return <AppNavigator />;
}
