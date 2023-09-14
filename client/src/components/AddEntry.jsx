import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../questions.js";
import "./AddEntry.css";

function AddEntry(props) {
    const navigate = useNavigate();

    let [formData, setFormData] = useState({
        question: "",
        content: "",
        mood: null
    });

    const [question, setQuestion] = useState("");

    const emojiOptions = ["😡", "😟", "😐", "😊", "😍"];

    // Randomly select a question from the questions array
    useEffect(() => {
        const questionIndex = Math.floor(Math.random() * questions.length);
        const question = questions[questionIndex].question;
        setQuestion(question);
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleClick = emoji => {
        setFormData((prevData) => ({
            ...prevData,
            mood: emoji,
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        // Turn mood into number between 1 and 5
        const moodMap = {
            "😡": 1,
            "😟": 2,
            "😐": 3,
            "😊": 4,
            "😍": 5
        };

        let selectedEmoji = formData.mood;
        formData.mood = moodMap[selectedEmoji];
        if (formData.mood === undefined) {
            console.log("Invalid mood emoji");
            return;
        }

        formData.question = question;

        props.addEntryCb(formData.question, formData.content, formData.mood);

        setFormData({
            question: "",
            content: "",
            mood: null
        });

        navigate("/all-entries");
    };

    return (
        <div className="AddEntry">
            <h1>Add Entry</h1>
            <h2>{question}</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={e => handleChange(e)}
                />

                <p className="UserMessage">Please remember that you can only submit one entry per day.<br />If you would like to answer another question, just refresh the page!</p>

                <div className="MoodSelection">
                    <h3>Today's Mood</h3>
                    {emojiOptions.map((emoji, index) => (
                        <button
                            key={index}
                            className={formData.mood === emoji ? "selected" : ""}
                            onClick={e => handleClick(emoji)}
                            type="button"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddEntry;