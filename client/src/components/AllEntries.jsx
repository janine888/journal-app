import React from "react";
import FeaturedEntry from "./FeaturedEntry.jsx";
import EntryList from "./EntryList.jsx";

function AllEntries(props) {
  return (
    <div className="AllEntries">
      <h1>All Entries</h1>
      <FeaturedEntry entries={props.entries} deleteEntry={props.deleteEntryCb} updateEntry={props.updateEntryCb} setEntries={props.setEntries} />
      <EntryList entries={props.entries} deleteEntry={props.deleteEntryCb} setEntries={props.setEntries} />
    </div>
  );
};

export default AllEntries;