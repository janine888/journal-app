import React, { useState, useEffect } from "react";
import questions from "../questions.js";
import "./EntryForm.css";

function EntryForm(props) {
    let [formData, setFormData] = useState({
        content: "",
        selectedEmoji: null,
    });

    const [randomQuestion, setRandomQuestion] = useState("");

    const emojiOptions = ["😡", "😟", "😐", "😊", "😍"];

    // Randomly select a question from the questions array
    useEffect(() => {
        const randomQuestionIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomQuestionIndex].question;
        setRandomQuestion(randomQuestion);
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
            selectedEmoji: emoji,
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        const updatedFormData = {
            content: formData.content,
            selectedEmoji: formData.selectedEmoji,
            randomQuestion: randomQuestion,
        };

        props.addFormDataCb(updatedFormData);

        setFormData({
            content: "",
            selectedEmoji: null
        });
    };

    return (
        <div className="EntryForm">
            <h2>{randomQuestion}</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={e => handleChange(e)}
                />

                <div className="mood-selection">
                    <h3>Today's Mood</h3>
                    {emojiOptions.map((emoji, index) => (
                        <button
                            key={index}
                            className={formData.selectedEmoji === emoji ? "selected" : ""}
                            onClick={e => handleClick(emoji)}
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

export default EntryForm;