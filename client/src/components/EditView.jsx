import React, { useState, useEffect } from "react";
import "./EditView.css";

function EditView({ id, content, maxLength, editMode, setEditMode, entries, setEntries }) {
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    if (!editMode) {
      setEditedContent(content);
    }
  }, [content, editMode]);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.slice(0, maxLength) + "...";
    return truncatedText;
  }

  // Function to format the date
  function formatDate(dateString) {
    let options = { year: "numeric", month: "long", day: "numeric" };
    let date = new Date(dateString);
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  // UPDATE an entry
  const updateEntry = async () => {
    let options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: editedContent })
    };

    try {
      let response = await fetch(`/api/entries/${id}`, options);
      if (response.ok) {
        let entries = await response.json();

        // Format the entries
        let formattedEntries = entries.map(entry => ({
          ...entry,
          formattedDate: formatDate(entry.created_at),
        }));

        setEntries(formattedEntries);
        setEditMode(false);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  const handleChange = (event) => {
    setEditedContent(event.target.value);
  };

  return (
    <div className="EditView">
      {editMode ? (
        <div>
          <textarea
            value={editedContent}
            onChange={handleChange}
          /><br />
          <button className="SaveButton" onClick={() => updateEntry(id)}>
            Save
          </button>
        </div>
      ) : (
        <p className="FeaturedEntryCardContent">{truncateText(content, maxLength)}</p>
      )}
    </div>
  );
}

export default EditView;