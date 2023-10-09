import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditView from "./EditView.jsx";
import "./EntryList.css";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from '@mui/icons-material/Edit';
import SingleEntry from "./SingleEntry.jsx";


function EntryList({ entries, deleteEntry, setEntries }) {
  return (
    <div className="EntryList">
      {/* maps over the entries array, excluding the first entry */}
      {entries.slice(1).map((entry) => (
        <SingleEntry entry={entry} setEntries={setEntries} deleteEntry={deleteEntry} />
      ))}
    </div>
  );
}

export default EntryList;