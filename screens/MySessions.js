import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import config from "../utils/config.js";

export default class MySessions extends Component {
  static navigationOptions = {
    title: "My Sessions"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>MY SESSION SCREEN</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally,
    height: 200,
    backgroundColor: config.colors.lightPrimary
  }
});
