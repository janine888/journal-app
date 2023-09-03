import { useState } from 'react';
import './App.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import EntryForm from "./components/EntryForm.jsx";
import AllEntries from "./components/AllEntries.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <Header />
        <EntryForm />
        <Footer />
      </div>
    </>
  )
}

export default App;