import React, { useState } from "react";
import "./EntryList.css";

function EntryList({ entries }) {
  const [expandedCards, setExpandedCards] = useState([]);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.slice(0, maxLength) + "...";
    return truncatedText;
  }

  const handleClick = (entryId) => {
    if (expandedCards.includes(entryId)) {
      setExpandedCards(expandedCards.filter((id) => id !== entryId));
    } else {
      setExpandedCards([...expandedCards, entryId]);
    }
  };

  return (
    <div className="EntryList">
      {entries.slice(1).map((entry) => (
        <div className="EntryCard" key={entry.id}>
          <h2 className="EntryCardTitle">{entry.question}</h2>
          <h4>{entry.formattedDate}</h4>
          <p className="EntryCardContent">
            {expandedCards.includes(entry.id)
              ? entry.content
              : truncateText(entry.content, 150)}
          </p>
          <div className="ReadMore">
            <button
              onClick={() => handleClick(entry.id)}
              className="ReadMoreLink"
            >
              {expandedCards.includes(entry.id) ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EntryList;