import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EntryList.css";

function EntryList({ entries }) {
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.slice(0, maxLength) + "...";
    return truncatedText;
  }

  return (
    <div className="EntryList">
      {entries.slice(1).map((entry) => (
        <div className="EntryCard" key={entry.id}>
          <h5>{entry.formattedDate}</h5>
          <h2 className="EntryCardTitle">{entry.question}</h2>
          <p className="EntryCardContent">
            {truncateText(entry.content, 150)}
          </p>
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