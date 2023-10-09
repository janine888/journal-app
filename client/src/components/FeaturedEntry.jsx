import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditView from "./EditView.jsx";
import "./FeaturedEntry.css";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from '@mui/icons-material/Edit';

function FeaturedEntry({ entries, deleteEntry, setEntries }) {
  const [editMode, setEditMode] = useState(false);

  // Define maximum text length for featured entry
  let maxLength = 400;

  // Get the first/newest entry in the list
  const featuredEntry = entries[0];

  // Handle delete button click
  const handleDelete = () => {
    if (featuredEntry) {
      deleteEntry(featuredEntry.id);
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    setEditMode(!editMode);
  };
  
  return (
    <div className="FeaturedEntry">
      {featuredEntry && (
        <div className="FeaturedEntryCard" key={featuredEntry.id}>
          <div className="FeaturedEntryContent">
            <div className="FeaturedEntryLeftColumn">
              <div className="FeaturedDeleteButton">
                <button onClick={handleDelete}>
                  <ClearIcon />
                </button>
              </div>
              <div className="FeaturedEditButton">
                <button onClick={handleEdit}>
                  <EditIcon />
                </button>
              </div>
              <h5>{featuredEntry.formattedDate}</h5>
              <h2 className="FeaturedEntryCardTitle">{featuredEntry.question}</h2>
              <EditView
                id={featuredEntry.id}
                content={featuredEntry.content}
                editMode={editMode}
                setEditMode={setEditMode}
                entries={entries}
                setEntries={setEntries}
                maxLength={maxLength}
              />
              <div className="FeaturedReadMore">
                <Link to={`/entry/${featuredEntry.id}`} className="FeaturedReadMoreLink">
                  Read More
                </Link>
              </div>
            </div>
            <div className="FeaturedEntryRightColumn">
              <img
                className="FeaturedEntryImage"
                src="/writing.jpg"
                alt="People Working"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedEntry;