import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AllEntries from "./components/AllEntries.jsx";
import IndividualEntry from "./components/IndividualEntry.jsx";
import AddEntry from "./components/AddEntry.jsx";
import MoodTracker from "./components/MoodTracker.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";

function App() {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries();
  }, []);

  // Function to format the date
  function formatDate(dateString) {
    let options = { year: "numeric", month: "long", day: "numeric" };
    let date = new Date(dateString);
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  // GET all entries
  const getEntries = async () => {
    try {
      let response = await fetch("/api/entries");
      if (response.ok) {
        let entries = await response.json();

        // Format the date
        let formattedEntries = entries.map(entry => ({
          ...entry,
          formattedDate: formatDate(entry.created_at),
        }));

        setEntries(formattedEntries);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  
  // const getIndividualEntry = async (id) => {
  //   try {
  //     console.log(`Fetching entry with ID: ${id}`);
  //     let response = await fetch(`/api/entries/${id}`);
  //     if (response.ok) {
  //       console.log(`Successful response for entry with ID: ${id}`);
  //       let entry = await response.json();

  //       setIndividualEntry(entry);
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Network error: ${err.message}`);
  //   }
  // }

  // POST new entry
  const addEntry = async (question, content, mood) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question, content, mood })
    };

    try {
      let response = await fetch("/api/entries", options);
      if (response.ok) {
        let entries = await response.json();

        // Format the entries
        let formattedEntries = entries.map(entry => ({
          ...entry,
          formattedDate: formatDate(entry.created_at),
        }));

        setEntries(formattedEntries);
      } else if (response.status === 404) {
          navigate("/error-message");
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  // UPDATE an entry
  const updateEntry = async (id) => {

  }

  // DELETE an entry
  const deleteEntry = async (id) => {
    let options = {
      method: "DELETE"
    };

    try {
      let response = await fetch(`/api/entries/${id}`, options);
      if (response.ok) {
        let entries = await response.json();
        setEntries(entries);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<AllEntries entries={entries} />} />
          <Route path="/all-entries" element={<AllEntries entries={entries} deleteEntryCb={deleteEntry} />} />
          <Route path="/entry/:id" element={<IndividualEntry />} />
          <Route path="/add-entry" element={<AddEntry addEntryCb={(question, content, mood) => addEntry(question, content, mood)} />} />
          <Route path="/mood-tracker" element={<MoodTracker entries={entries} />} />
          <Route path="/error-message" element={<ErrorMessage />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App;