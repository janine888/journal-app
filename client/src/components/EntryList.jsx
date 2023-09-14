import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditView from "./EditView.jsx";
import "./EntryList.css";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from '@mui/icons-material/Edit';

function EntryList({ entries, deleteEntry, setEntries }) {
  const [editMode, setEditMode] = useState(false);

  // Define maximum text length for featured entry
  let maxLength = 150;

  // function truncateText(text, maxLength) {
  //   if (text.length <= maxLength) {
  //     return text;
  //   }
  //   const truncatedText = text.slice(0, maxLength) + "...";
  //   return truncatedText;
  // }

  // Handle delete button click
  const handleDelete = (entryId) => {
    deleteEntry(entryId);
  };

  // Handle edit button click
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="EntryList">
      {entries.slice(1).map((entry) => (
        <div className="EntryCard" key={entry.id}>
          <div className="DeleteButton">
            <button onClick={() => handleDelete(entry.id)}>
              <ClearIcon />
            </button>
          </div>
          <div className="EditButton">
            <button onClick={() => handleEdit(entry.id)}>
              <EditIcon />
            </button>
          </div>
          <h5>{entry.formattedDate}</h5>
          <h2 className="EntryCardTitle">{entry.question}</h2>
          <EditView id={entry.id} content={entry.content} editMode={editMode} setEditMode={setEditMode} entries={entries} setEntries={setEntries} maxLength={maxLength} />
          {/* <p className="EntryCardContent">
            {truncateText(entry.content, 150)}
          </p> */}
          <div className="ReadMore">
            <Link to={`/entry/${entry.id}`} className="ReadMoreLink">
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EntryList;