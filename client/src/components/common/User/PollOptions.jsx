import { useState, useEffect } from "react"; // Importing necessary hooks from React

export default function PollOptions() {
  const maxAnswers = 5; // Maximum number of answers allowed
  const sessionKey = "pollAnswers";  // Key for storing answers in session storage

  // Retrieve answers from sessionStorage or initialize with default values
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = sessionStorage.getItem(sessionKey);
    return savedAnswers ? JSON.parse(savedAnswers) : ["", ""];  // Fallback to 2 empty options if nothing stored
  });

  // State for poll title, initialized from sessionStorage
  const [title, setTitle] = useState(() => {
    const savedTitle = sessionStorage.getItem("pollTitle");
    return savedTitle || ""; // Default to empty string if no title is saved
  });

  // State for poll description, initialized from sessionStorage
  const [description, setDescription] = useState(() => {
    const savedDescription = sessionStorage.getItem("pollDescription");
    return savedDescription || ""; // Default to empty string if no description is saved
  });

  // Sync title and description to sessionStorage when they update
  useEffect(() => {
    sessionStorage.setItem("pollTitle", title);
  }, [title]);

  useEffect(() => {
    sessionStorage.setItem("pollDescription", description);
  }, [description]);

  // Sync answers to sessionStorage when they update
  useEffect(() => {
    sessionStorage.setItem(sessionKey, JSON.stringify(answers)); // Store answers as a JSON string
  }, [answers]);

  // Function to add a new answer option
  const addAnswer = () => {
    if (answers.length < maxAnswers) {
      setAnswers([...answers, ""]); // Add a new empty string for a new answer
    }
  };

  // Function to handle answer input changes
  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers]; // Create a copy of the current answers
    newAnswers[index] = event.target.value; // Update the specific answer
    setAnswers(newAnswers); // Update the state
  };

  // Function to remove an answer option
  const removeAnswer = (index) => {
    setAnswers(answers.filter((_, i) => i !== index)); // Filter out the removed answer
  };

  return (
    <div className="container mt-5">
      <form method="POST" className="p-4 border rounded shadow-sm bg-light">        
        <div className="mb-3">
          <label htmlFor="titleID" className="form-label">Poll Title *</label>
          <input
            className="form-control"
            id="titleID"
            placeholder="Enter title here*"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title on input change
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descID" className="form-label">Description *</label>
          <input
            className="form-control"
            id="descID"
            placeholder="Enter description here*"
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description on input change
          />
        </div>
        
        <h5 className="mt-4">Answers</h5>

        {answers.map((answer, index) => (
          <div key={index} className="mb-3 d-flex align-items-center">
            ⚫
            <input
              className="me-2 form-control"
              placeholder={`Answer ${index + 1}*`}
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e)} // Update answer on input change
              required
            />
            {index >= 2 && ( // Show remove button if there are 3 or more answers
              <button
                type="button"
                className="btn btn-danger btn-sm ms-2"
                onClick={() => removeAnswer(index)} // Remove specific answer
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Show Add Answer button if the maximum number of answers hasn't been reached */}
        {answers.length < maxAnswers && (
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={addAnswer} // Add new answer option
          >
            Add Answer
          </button>
        )}
      </form>
    </div>
  );
}
