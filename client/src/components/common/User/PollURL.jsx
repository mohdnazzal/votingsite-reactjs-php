import { useState, useEffect } from "react"; // React hooks for state and effect
import { useParams } from "react-router-dom"; // To access URL parameters
import axios from "axios"; // Axios for HTTP requests

export default function PollURL() {
  const { pollId } = useParams(); // Extract pollId from URL parameters
  const [pollData, setPollData] = useState(null); // State to store poll data
  const [error, setError] = useState(null); // State to handle errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success messages
  const [voted, setVoted] = useState(false); // State to check if the user has voted

  // Convert expiryDate to ISO format if pollData exists
  const expiryDateStr = pollData?.settings?.expiryDate;
  let expiryDate = expiryDateStr ? new Date(expiryDateStr.replace(" ", "T")) : null;

  // Effect to fetch poll data
  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await axios.get(`https://web1002.web.portfolios.mknazzal.com/server/Polls.php?pollId=${pollId}`);
        if (response.data.success && response.data.poll) {
          setPollData({ ...response.data.poll, id: response.data.poll.id });
        } else {
          setError("Poll data not found.");
        }
      } catch (err) {
        setError("Could not fetch poll data. Please try again later. " + err.message);
      }
    };

    const hasVoted = localStorage.getItem(`voted_${pollId}`);
    setVoted(Boolean(hasVoted)); // Check if the user has already voted
    fetchPollData(); // Fetch poll data
  }, [pollId]);

  // Function to handle voting
  const handleVote = async (answer) => {
    if (voted && pollData.settings.voteOncePerIP) {
      setError("You have already voted on this poll."); // Prevent multiple votes
      return;
    }

    try {
      const response = await axios.post("https://web1002.web.portfolios.mknazzal.com/server/SubmitVote.php", {
        pollId,
        Id: pollData.id,
        answer
      });
      if (response.data.success) {
        localStorage.setItem(`voted_${pollId}`, true); // Mark the poll as voted in local storage
        setVoted(true);
        setSuccessMessage("Thank you for voting!");
        setError(null);
      } else {
        setError(response.data.message || "Failed to submit vote. Please try again.");
      }
    } catch (err) {
      setError("Could not submit vote. Please try again later. " + err.message);
    }
  };

  // Render loading or error state
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!pollData) return <p>Loading...</p>;

  return (
    <div>
      {((voted && pollData.settings.voteOncePerIP) || (new Date() > expiryDate)) ? (
        <h3 className="text-center">Thank you for voting!</h3> // Thank you message after voting
      ) : (
      <div>
        <h2 className="text-center">{pollData.title}</h2>
        <p className="text-center">{pollData.description}</p>
        <hr />
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
        <ul>
          {pollData.answers && pollData.answers.map((answer, index) => (
            <button 
              className="btn options-btn" 
              key={index} 
              onClick={() => handleVote(answer)} // Handle vote on button click
              disabled={(voted && pollData.settings.voteOncePerIP) || (new Date() > expiryDate)} // Disable if already voted or expired
            >
              {answer}
            </button>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}
