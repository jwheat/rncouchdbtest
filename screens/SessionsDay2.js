import React, { Component } from "react";

import { TouchableHighlight, StyleSheet, View, FlatList } from "react-native";

import SessionRow from "../components/SessionRow";

import PouchDB from "pouchdb-react-native";
PouchDB.plugin(require("pouchdb-find"));
PouchDB.debug.enable("pouchdb:find");

//import _ from "lodash";

const syncStates = [
  "change",
  "paused",
  "active",
  "denied",
  "complete",
  "error"
];

const keyExtractor = ({ _id }) => _id;

export default class SessionsDay2 extends Component {
  constructor(props) {
    super(props);

    this.localDB = new PouchDB("mydb", {
      revs_limit: 1,
      auto_compaction: true
    });

    this.remoteDB = new PouchDB("http://localhost:5984/cs-test");

    this.sync = this.localDB.sync(this.remoteDB, {
      live: true,
      retry: true
    });

    this.state = {
      docs: [],
      syncStatus: ""
    };
  }

  addOrUpdateDocChanges(newDoc) {
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
      .sort((a, b) => a.start_time > b.start_time);
    //.sort((a, b) => a.title > b.title);

    this.setState({
      docs: sortedState
    });
  }

  removeDoc(oldDoc) {
    this.setState({
      docs: this.state.docs.filter(doc => doc._id !== oldDoc._id)
    });
  }

  closeConnection() {
    this.sync.cancel();
    this.localDB.close();
    this.remoteDB.close();
    this.sync = null;
    this.localDB = null;
    this.remoteDB = null;
  }

  componentDidMount() {
    this.displayData();
  }

  componentWillUnmount() {
    this.closeConnection();
  }

  displayData() {
    if (!this.state.docs.length === 0) {
      console.log("Empty State");
    } else {
      this.localDB
        .createIndex({
          index: {
            fields: ["start_date", "start_time", "title"],
            name: "sessions"
          }
        })
        .then(
          function(result) {
            this.displaySessions();
            console.log(result);
            console.log(this.props.stateindex);
          }.bind(this)
        );
    }
  }

  displaySessions() {
    this.localDB
      .find({
        selector: {
          start_date: { $eq: this.props.start_date }
        }
        //sort: ["start_date", "start_time", "title"],
        //include_docs: true
      })
      .then(
        function(result) {
          console.log("State 1");
          console.log(this.state.docs);
          console.log("Result 1");

          console.log(result);

          this.setState({
            docs: result.docs.map(row => row)
          });

          //this.sortState();
          console.log("State 2");
          console.log(this.state.docs);
        }.bind(this)
      )
      .catch(function(err) {
        console.log("Error!");
        console.log(err);
      });
  }

  // below works without a query or filter - ALL DOCS are displayed
  xdisplaySessions() {
    if (!this.state.docs.length === 0) {
      console.log("Empty State");
    } else {
      this.localDB
        .allDocs({ include_docs: true })
        .then(results => {
          console.log("Results (for all)");

          console.log(results.rows.length); // = 14
          console.log(results);
          this.setState({
            docs: results.rows.map(row => row.doc)
          });

          this.sortState();
          //console.log(results.rows.map(row => row.doc));

          console.log("State (for all)");
          console.log(this.state.docs);
        })
        .catch(err => console.log.bind(console, "[Fetch all]"));

      /*
    const sync = this.localDB.sync(this.remoteDB, {
      live: true,
      retry: true
    });
    */
    }

    syncStates.forEach(state => {
      this.sync.on(state, setCurrentState.bind(this, state));

      function setCurrentState(state) {
        console.log("[Sync:" + state + "]");

        //if (state === "change") {
        //  this.refreshData();
        //}

        this.setState({
          syncStatus: state
        });
      }
    });
  }

  refreshData() {
    this.localDB
      .changes({
        live: true,
        include_docs: true
      })
      .on("change", this.handleChange.bind(this))
      .on("complete", console.log.bind(console, "[Change:Complete]"))
      .on("error", console.log.bind(console, "[Change:Error]"));

    //this.displayData();
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
    this.localDB
      .remove(oldDoc)
      .catch(console.log.bind(console, "Error removing"));
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
      this.addOrUpdateDocChanges(doc);
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
    width: 380
  }
});
