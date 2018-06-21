import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";

import config from "../utils/config.js";

export default class Header extends Component {
  render() {
    if (this.props.displayLogo) {
      return (
        <View style={styles.container}>
          <Image
            style={styles.headerImage}
            source={require("../images/logo.png")}
            resizeMode="contain"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.headerText}>{config.client.clientEventName}</Text>
        </View>
      );
    }
  }
}

// skip these lines if using Create React Native App
AppRegistry.registerComponent("DisplayAnImageWithStyle", () => Header);

const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally,
    height: 50,
    width: "100%"
  },
  headerText: {
    color: config.colors.primaryText,
    fontFamily: "Avenir",
    fontSize: 26
  },
  headerImage: {
    height: 50,
    width: "100%",
    marginTop: 20
  }
});
