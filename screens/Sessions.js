import React, { Component } from "react";

import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";

import SessionRow from "../components/SessionRow";

import PouchDB from "pouchdb-react-native";
//import Moment from "react-moment";
//import "moment-timezone";
import _ from "lodash";

const localDB = new PouchDB("mydb", { revs_limit: 1, auto_compaction: true });
const remoteDB = new PouchDB("http://localhost:5984/cs-test");
//const remoteDB = new PouchDB("http://153.42.136.45:5984/cs-test");

const syncStates = [
  "change",
  "paused",
  "active",
  "denied",
  "complete",
  "error"
];

const keyExtractor = ({ _id }) => _id;

export default class Sessions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docs: [],
      syncStatus: ""
    };

    this.refreshData();
  }

  addDoc(newDoc) {
    //this.refreshData();
    let docs = [...this.state.docs];
    let index = docs.findIndex(el => el._id === newDoc._id);
    if (index !== -1) {
      // found an item with this id - update it
      docs[index] = {
        ...docs[index],
        title: newDoc.title,
        start_date: newDoc.start_date,
        start_time: newDoc.start_time,
        end_date: newDoc.end_date,
        end_time: newDoc.end_time,
        instructors: newDoc.instructors,
        track: newDoc.track,
        room: newDoc.room,
        level: newDoc.level,
        session_canceled: newDoc.session_canceled
      };
      this.setState({ docs });
    } else {
      // this item does not exist, contactinate to end of the list
      this.setState({
        docs: this.state.docs.concat(newDoc)
      });

      // re-sort the list allowing the new document to pop into the proper place
      this.sortState();
    }
  }

  sortState() {
    const sortedState = []
      .concat(this.state.docs)
      .sort((a, b) => a.start_date > b.start_date)
      .sort((a, b) => a.start_time > b.start_time)
      .sort((a, b) => a.title > b.title);

    this.setState({
      docs: sortedState
    });
  }
  removeDoc(oldDoc) {
    this.setState({
      docs: this.state.docs.filter(doc => doc._id !== oldDoc._id)
    });
  }

  //componentDidMount() {
  //  this.refreshData();
  //}

  refreshData() {
    localDB
      .allDocs({ include_docs: true })
      .then(results => {
        this.setState({
          docs: results.rows.map(row => row.doc)
        });

        this.sortState();
        //console.log(results.rows.map(row => row.doc));
        //console.log(this.state.docs);
      })
      .catch(err => console.log.bind(console, "[Fetch all]"));

    const sync = localDB.sync(remoteDB, {
      live: true,
      retry: true
    });

    syncStates.forEach(state => {
      sync.on(state, setCurrentState.bind(this, state));

      function setCurrentState(state) {
        console.log("[Sync:" + state + "]");

        this.setState({
          syncStatus: state
        });
      }
    });

    localDB
      .changes({
        live: true,
        include_docs: true
      })
      .on("change", this.handleChange.bind(this))
      .on("complete", console.log.bind(console, "[Change:Complete]"))
      .on("error", console.log.bind(console, "[Change:Error]"));
  }

  renderSessionRow = ({ item }) => {
    const {
      _id,
      title,
      instructors,
      start_date,
      start_time,
      end_date,
      end_time,
      room,
      track,
      level,
      session_canceled
    } = item;

    return (
      <SessionRow
        title={title}
        presenters={instructors}
        start_date={start_date}
        start_time={start_time}
        end_date={end_date}
        end_time={end_time}
        room={room}
        track={track}
        slevel={level}
        session_canceled={session_canceled}
        //onPress={() => navigate("Profile", { contact: item })}
      />
    );
  };

  onDocRemove(oldDoc) {
    localDB.remove(oldDoc).catch(console.log.bind(console, "Error removing"));
  }

  handleChange(change) {
    console.log("[Change:Change]", change);

    var doc = change.doc;

    if (!doc) {
      return;
    }

    if (doc._deleted) {
      this.removeDoc(doc);
    } else {
      this.addDoc(doc);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listcontainer}
          data={this.state.docs}
          keyExtractor={keyExtractor}
          renderItem={this.renderSessionRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  },
  listcontainer: {
    backgroundColor: "white",
    //flex: 1,
    width: 400
  }
});
