import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./IndividualEntry.css";

function IndividualEntry() {
  const { id } = useParams();
  // Convert the string id to a number
  const numericId = Number(id);

  const [individualEntry, setIndividualEntry] = useState({
    id: null,
    user_id: null,
    question: "",
    content: "",
    created_at: ""
  });

  // GET one entry
  useEffect(() => {
    const getIndividualEntry = async () => {
      try {
        let response = await fetch(`/api/entries/${numericId}`);
        if (response.ok) {
          let entry = await response.json();
          setIndividualEntry(entry[0]);
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

  // Function to format the date
  function formatDate(dateString) {
    let options = { year: "numeric", month: "long", day: "numeric" };
    let date = new Date(dateString);
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div className="IndividualEntry">
      {individualEntry && (
        <>
          <h5>{formatDate(individualEntry.created_at)}</h5>
          <h2>{individualEntry.question}</h2>
          <p>{individualEntry.content}</p>
        </>
      )}
    </div>
  );
}

export default IndividualEntry;