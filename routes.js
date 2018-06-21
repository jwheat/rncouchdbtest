import { TabNavigator } from "react-navigation";

import Home from "./screens/Home";
import MySessions from "./screens/MySessions";
import Attendees from "./screens/Attendees";
import Vendors from "./screens/Vendors";
import Sessions from "./screens/Sessions";

//import Ionicons from "react-native-vector-icons/Ionicons";
//import config from "./utils/config.js";

export default TabNavigator(
  {
    Home: {
      screen: Home
    },
    MySessions: {
      screen: MySessions
    },
    Attendees: {
      screen: Attendees
    },
    Vendors: {
      screen: Vendors
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);
