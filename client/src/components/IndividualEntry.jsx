import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function IndividualEntry() {
  const { id } = useParams();
  console.log(id);
  // Convert the string id to a number
  const numericId = Number(id);

  const [individualEntry, setIndividualEntry] = useState(null);

  // GET one entry
  useEffect(() => {
    console.log("ID:", typeof numericId);
    const getIndividualEntry = async () => {
      try {
        console.log(`Fetching entry with ID: ${typeof numericId}, ${numericId}`);
        let response = await fetch(`/api/entries/${numericId}`);
        if (response.ok) {
          console.log(`Successful response for entry with ID: ${numericId}`);
          let entry = await response.json();
          setIndividualEntry(entry);
        } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.log(`Network error: ${err.message}`);
      }
    };

    getIndividualEntry();
  }, [numericId]);

  if (!individualEntry) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="IndividualEntry">
      {individualEntry && (
        <>
          <h2>{individualEntry.formattedDate}</h2>
          <p>{individualEntry.question}</p>
          <p>{individualEntry.content}</p>
        </>
      )}
    </div>
  );
}

export default IndividualEntry;