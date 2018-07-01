import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import Home from "./screens/Home";
import MySessions from "./screens/MySessions";
import Attendees from "./screens/Attendees";
import Vendors from "./screens/Vendors";
import More from "./screens/Sessions";

import Ionicons from "react-native-vector-icons/Ionicons";
import config from "./utils/config.js";

export default createBottomTabNavigator(
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
    },
    More: {
      screen: More
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "MySessions") {
          iconName = `ios-bookmark${focused ? "" : "-outline"}`;
        } else if (routeName === "Attendees") {
          iconName = `ios-contacts${focused ? "" : "-outline"}`;
        } else if (routeName === "Vendors") {
          iconName = `ios-easel${focused ? "" : "-outline"}`;
        } else if (routeName === "More") {
          iconName = `ios-more${focused ? "" : "-outline"}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),

    tabBarPosition: "bottom",
    animationEnabled: false,
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: config.colors.darkPrimary,
      inactiveTintColor: config.colors.secondaryText
    }
  }
);
