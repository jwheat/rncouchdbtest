import React, { Component } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";

//import { Ionicons } from "@expo/vector-icons";
//import { FontAwesome } from "@expo/vector-icons";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Moment from "react-moment";

export function splitPresenters(presenters) {
  return presenters.substring(0, presenters.length - 1).replace("|", "\n\n");
}

export default class SessionRow extends Component {
  render() {
    return (
      <View
        style={
          this.props.session_canceled === "Y" ? styles.rowcanceled : styles.row
        }
      >
        <View style={styles.timeblock}>
          <View style={styles.starttimeblock}>
            <Moment
              element={Text}
              parse="HH:mm:ss"
              format="h:mm A"
              style={styles.starttime}
            >
              {this.props.start_time}
            </Moment>
            <Text style={styles.dottime}> -</Text>
          </View>
          <View style={styles.endtimeblock}>
            <Moment
              element={Text}
              parse="HH:mm:ss"
              format="h:mm A"
              style={styles.endtime}
            >
              {this.props.end_time}
            </Moment>
          </View>
          <View style={styles.favoriteblock}>
            <Ionicons
              key={"iconKey" + this.props.title + this.props._id}
              name="md-star-outline"
              size={38}
              color="grey"
              style={styles.favorite}
              //onPress={event =>
              //  addToFavourites
              //    ? this.addToMyTopics(event, _id)
              //    : this.removeFromMyTopics(event, _id)
              //}
            />
          </View>
          <View style={styles.levelrow}>
            <Text style={styles.level}>{this.props.slevel}</Text>
          </View>
        </View>

        <View style={styles.dividerdotblock}>
          <FontAwesome
            key={"faiconKey" + this.props.title + this.props._id}
            name="dot-circle-o"
            size={12}
            color="grey"
            style={styles.dividerdot}
            //onPress={event =>
            //  addToFavourites
            //    ? this.addToMyTopics(event, _id)
            //    : this.removeFromMyTopics(event, _id)
            //}
          />

          <View style={styles.dividerdotlineNormal} />
        </View>
        <TouchableHighlight
          underlayColor={"#ccc"}
          style={styles.container}
          //onPress={onPress}
        >
          <View style={styles.contentrow}>
            <View style={styles.titlerow}>
              <Text style={[styles.title]}>{this.props.title}</Text>
            </View>

            <View style={styles.presentersrow}>
              <Text style={styles.presenters}>{this.props.presenters}</Text>
            </View>
            <View style={styles.trackroomrow}>
              <Text style={styles.track}>{this.props.track}</Text>
              <Text
                style={
                  this.props.session_canceled === "Y"
                    ? styles.canceled
                    : styles.room
                }
              >
                {this.props.session_canceled === "Y"
                  ? " CANCELED "
                  : this.props.room}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
    marginRight: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  rowcanceled: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
    marginRight: 5,
    backgroundColor: "#CD9B9B",
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  timeblock: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    minWidth: 65,
    maxWidth: 65,
    marginRight: 3
  },
  starttimeblock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    height: 15
  },
  endtimeblock: {
    flex: 1,
    flexDirection: "row"
    //paddingLeft: 10
  },
  starttime: {
    fontSize: 12
  },
  dottime: {
    fontSize: 10
  },
  endtime: {
    fontSize: 12,
    justifyContent: "flex-end"
  },
  favoriteblock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: 65
  },
  favorite: {
    paddingTop: 8
  },
  levelrow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: 65,
    bottom: 0
  },
  level: {
    fontSize: 10,
    bottom: 0
  },
  dividerdotblock: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    minWidth: 20,
    maxWidth: 20,
    height: "100%",
    paddingTop: 3,
    paddingBottom: 3
  },
  dividerdot: {
    alignItems: "center",
    paddingBottom: 3
  },
  dividerdotlineNormal: {
    height: "80%", // 50,
    width: 1,
    backgroundColor: "gray",
    paddingTop: 5
  },
  dividerdotlineHighlight: {
    height: "80%", // 50,
    width: 1,
    backgroundColor: "orange",
    paddingTop: 5
  },
  contentrow: {
    flex: 1,
    flexDirection: "column"
  },
  titlerow: {
    width: "90%"
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16
  },
  presentersrow: {
    paddingTop: 5,
    paddingBottom: 5,
    width: "90%"
  },
  presenters: {
    fontSize: 13
  },
  trackroomrow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  track: {
    fontSize: 12
    //justifyContent: "center"
  },
  room: {
    //flex: 1,
    fontSize: 12,
    justifyContent: "center"
    //justifyContent: "flex-end"
  },
  bottomrow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  canceled: {
    color: "#660000",
    fontSize: 25,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#660000",
    opacity: 0.8,
    backgroundColor: "#ffffff",
    transform: [{ rotate: "-15deg" }],
    position: "absolute",
    top: -20,
    right: 20,
    overflow: "hidden" // hides the white corners
  }
});
