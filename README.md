# React Native with PouchDB Experimentation

This is an experimental project to play around with the possibiliteis of using PouchDB with react native.

I've chosen a conference application to experiment with because I have a lot of experience building this type of app. It MUST work offline because venue wireless is typically wonky at best, and it has many different requirements that will help me learn how to interact with a database.

This currently attaches to a couchDB server runnign on my laptop, so you most likely wont' be able to run this on your own unless you create on that mimics mine - which is probably a simple thing to do.

Here is an example document with the fields I'm using if you want to play around and create a couchDB on your system

    {
      "_id": "300",
      "_rev": "52-964382295e201381613da33ef975e0f5",
      "id": "300",
      "title": "Introduction to Laravel, WOOT! ",
      "instructors": "Jonathan Wheat, JCMP Labs / Messiah College|",
      "body": " ",
      "room": "Majestic II",
      "start_date": "2019-11-20",
      "start_time": "10:00:00",
      "end_date": "2017-11-20",
      "end_time": "10:50:00",
      "data": "",
      "track": "Programming",
      "lastupdated": "1510759569",
      "level": "All Attendees",
      "session_canceled": "N",
      "session_active": "Y"
    }

_Use at your own risk_

## Current file architecture

### A Quick overview of what is here and my thoughts

- **App.js** sets up the AppNavigator imported from routes.js
- **routes.js** builds the overall navigation for the bottom TabNavigator tabs, I set the initial route to Home
- **Home.js** is the main screen viewed when the app runs. This contains a set of custome tabs right now that breaks the app into days of the "conference" (Sunday / Monday / Tuesday). Currently I have Sunday loading my Sessions component.
- **Sessions.js** is the main component that (for now) loads all of the sessions from the database. This contains all of the PouchDB code, handles the syncing and loading into state (not sure this is the proper thing to do yet). This renders each row by calling the SessionRow component
- **SessionRow.js** is the component that formats and displays the various characteristics of the session into a somewhat neat flex-crazed package.
- **MySessions.js** / **Attendees.js** / **Vendors.js** - these are placeholder screens that the bottom tabs link up to

### My Problem

PouchDB is working and talking to my local CouchDB server, when the app runs, I can edit documents from Fauxton and the changes are reflected immediately in my app.

The problem is that the rest of the app (my custom tabs, and bottom tabs) are non-responsive for about 30 seconds. I imagine some timeout eventually occurs, at which point I can change screens. If I go back to the Home screen (with the session list) I get the nasy red error - EventEmitter memory leak detected error message.

If I comment out refreshData() in componentDidMount in Home.js, the app runs, everything works, but no data is displayed, because it is never told to. I think the problem exists within this refreshData function, but I haven't figured out yet where, or how to fix it.

Any help is appreciated!
