import React, { useState } from "react";
import "./FeaturedEntry.css";

function FeaturedEntry({ entries }) {
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.slice(0, maxLength) + "...";
    return truncatedText;
  }

  // Get the first/newest entry in the list
  const featuredEntry = entries[0];

  const handleClick = (entryId) => {
    if (expandedCards.includes(entryId)) {
      setExpandedCards(expandedCards.filter((id) => id !== entryId));
    } else {
      setExpandedCards([...expandedCards, entryId]);
    }
  };

  return (
    <div className="FeaturedEntry">
      {featuredEntry && (
        <div className="FeaturedEntryCard" key={featuredEntry.id}>
          <div className="FeaturedEntryContent">
            <div className="FeaturedEntryLeftColumn">
              <h2 className="FeaturedEntryCardTitle">{featuredEntry.question}</h2>
              <h4>{featuredEntry.formattedDate}</h4>
              <p className="FeaturedEntryCardContent">
                {truncateText(featuredEntry.content, 150)}
              </p>
            </div>
            <div className="FeaturedEntryRightColumn">
              <img
                className="FeaturedEntryImage"
                src="public/writing.jpg"
                alt="People Working"
              />
            </div>
          </div>
          <div className="FeaturedReadMore">
            <a
              // navigate("/individual-entry");
              className="FeaturedReadMoreLink"
            >
              Read More
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedEntry;