import React from "react";
import "./EntryList.css";

const AllEntries = ({ entries }) => {
  return (
    <div>
      {entries.map((entry) => (
        <div className="EntryCard" key={entry.id}>
          <h2 className="EntryCardTitle">{entry.title}</h2>
          <p className="EntryCardContent">{entry.content}</p>
          <div className="ReadMore">
            <a href="#" className="ReadMoreLink">
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllEntries;