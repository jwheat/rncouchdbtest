import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "../components/Header.js";
import HomeContent from "../components/HomeContent.js";
import Tabs from "../components/Tabs.js";
import Sessions from "../screens/Sessions";

import config from "../utils/config.js";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header displayLogo={true} style={styles.appHeader} />
        <HomeContent />
        <View style={styles.tabContainer}>
          <Tabs>
            {/* First tab */}
            <View title="Sunday" style={styles.content}>
              <Sessions />
            </View>
            {/* Second tab */}
            <View title="Monday" style={styles.content}>
              <Text style={styles.header}>Truly Native</Text>
              <Text style={styles.text}>
                Components you define will end up rendering as native platform
                widgets
              </Text>
            </View>
            {/* Third tab */}
            <View title="Tuesday" style={styles.content}>
              <Text style={styles.header}>Ease of Learning</Text>
              <Text style={styles.text}>
                It’s much easier to read and write comparing to native
                platform’s code
              </Text>
            </View>
          </Tabs>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1
  },
  appHeader: {
    //flex: 1,
    height: 50
  },
  tabContainer: {
    flex: 6, // Take up all screen
    backgroundColor: config.colors.darkPrimary // Background color
  },
  // Tab content container
  content: {
    flex: 1, // Take up all available space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: config.colors.white // Darker background for content area
  },
  // Content header
  header: {
    margin: 10,
    color: config.colors.primaryText,
    fontFamily: "Avenir",
    fontSize: 26
  },
  // Content text
  text: {
    marginHorizontal: 20, // Add horizontal margin
    color: config.colors.primaryText, // Semi-transparent text
    textAlign: "center", // Center
    fontFamily: "Avenir",
    fontSize: 18
  }
});
