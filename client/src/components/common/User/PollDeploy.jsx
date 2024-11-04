import { useState } from "react"; // Importing useState for managing state in the component

// PollDeploy component definition
export default function PollDeploy() {
  // State for holding the generated poll URL
  const [pollURL, setPollURL] = useState(null);
  
  // State for message feedback to the user
  const [message, setMessage] = useState({ type: "", text: "" });

  // Function to generate the poll URL
  const generatePollURL = async () => {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem("userID");

    // Check if the user ID exists
    if (!storedUser) {
      setMessage({ type: "danger", text: "User is not logged in." });
      return; // Exit if user is not logged in
    }

    // Prepare poll data to send to the server
    const pollData = {
      userID: storedUser, // Include user ID in poll data
      title: sessionStorage.getItem("pollTitle"),
      description: sessionStorage.getItem("pollDescription"),
      answers: JSON.parse(sessionStorage.getItem("pollAnswers")), // Parse answers from session storage
      settings: {
        voteOncePerIP: sessionStorage.getItem("voteOncePerIP") === "true", // Convert to boolean
        expiryDate: sessionStorage.getItem("pollExpiryDate"),
      },
    };

    try {
      // Validate input fields before making a request
      if (
        sessionStorage.getItem("pollTitle") === "" ||
        sessionStorage.getItem("pollDescription") === "" ||
        JSON.parse(sessionStorage.getItem("pollAnswers"))[0] === "" ||
        JSON.parse(sessionStorage.getItem("pollAnswers"))[1] === ""
      ) {
        setMessage({
          type: "danger",
          text: `Please fill the fields.`, // Error message for empty fields
        });
      } else {
        // Send poll data to backend PHP script
        const response = await fetch("https://web1002.web.portfolios.mknazzal.com/server/SavePoll.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pollData), // Send the poll data as JSON
        });

        const result = await response.json(); // Parse the JSON response
        if (result.success) {
          // Poll was saved successfully, generate the URL
          const uniqueID = result.pollID; // Get the poll ID from the response
          setPollURL(`${uniqueID}`); // Set the poll URL
          setMessage({
            type: "success",
            text: "Poll URL generated successfully!", // Success message
          });
        } else {
          // Handle errors returned from the server
          setMessage({
            type: "danger",
            text: `Failed to save poll: ${result.message}`, // Error message
          });
        }
      }
    } catch (error) {
      // Handle any unexpected errors
      setMessage({
        type: "danger",
        text: "An error occurred while generating the poll URL.", // Error message
      });
      console.error("Error:", error); // Log error details to console
    }
  };

  return (
    <div className="container mt-5">
      {/* Button to trigger poll URL generation */}
      <button
        type="button"
        className="btn btn-success mt-3"
        onClick={generatePollURL}
      >
        Generate URL & Share Poll
      </button>

      {/* Display feedback message to the user */}
      {message.text && (
        <div className={`alert alert-${message.type} mt-3`} role="alert">
          {message.text}
        </div>
      )}

      {/* Show the generated poll URL if it exists */}
      {pollURL && (
        <div className="mt-3">
          <p>Poll URL:</p>
          <a href={`/polls/${pollURL}`} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </div>
      )}
    </div>
  );
}
