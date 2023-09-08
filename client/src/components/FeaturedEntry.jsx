import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="FeaturedEntry">
      {featuredEntry && (
        <div className="FeaturedEntryCard" key={featuredEntry.id}>
          <div className="FeaturedEntryContent">
            <div className="FeaturedEntryLeftColumn">
              <h5>{featuredEntry.formattedDate}</h5>
              <h2 className="FeaturedEntryCardTitle">{featuredEntry.question}</h2>
              <p className="FeaturedEntryCardContent">
                {truncateText(featuredEntry.content, 400)}
              </p>
                <div className="FeaturedReadMore">
                  <Link to={`/entry/${featuredEntry.id}`} className="FeaturedReadMoreLink">
                    Read More
                  </Link>
                </div>
            </div>
            <div className="FeaturedEntryRightColumn">
              <img
                className="FeaturedEntryImage"
                src="public/writing.jpg"
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