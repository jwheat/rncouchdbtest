import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import config from "../utils/config.js";

export default class More extends Component {
  static navigationOptions = {
    title: "More"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>More Options</Text>
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
