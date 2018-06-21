import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome";

//import colors from "../utils/colors.js";
import config from "../utils/config.js";

export default class Vendors extends Component {
  static navigationOptions = {
    title: config.client.vendorText
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>VENDORS SCREEN</Text>
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
