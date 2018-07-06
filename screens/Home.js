import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "../components/Header.js";
import HomeContent from "../components/HomeContent.js";
import Tabs from "../components/Tabs.js";
import Sessions from "../screens/Sessions";

import config from "../utils/config.js";

const days = [["dayname", "date"]];

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header displayLogo={true} style={styles.appHeader} />
        <HomeContent />
        <View style={styles.tabContainer}>
          <Tabs>
            {/* First tab */}
            <View title={config.days[0][0]} style={styles.content}>
              <Sessions start_date={config.days[0][1]} />
            </View>
            {/* Second tab */}
            <View title={config.days[1][0]} style={styles.content}>
              <Sessions start_date={config.days[1][1]} />
            </View>
            {/* Third tab */}
            <View title={config.days[2][0]} style={styles.content}>
              <Sessions start_date={config.days[2][1]} />
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
