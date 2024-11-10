import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../assets/styles/pollURL.css";

export default function PollURL() {
  const { pollId } = useParams();
  const [pollData, setPollData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState(null);

  const expiryDateStr = pollData?.settings?.expiryDate;
  let expiryDate = expiryDateStr ? new Date(expiryDateStr.replace(" ", "T")) : null;

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

    // Check if the user has previously voted
    const hasVoted = localStorage.getItem(`voted_${pollId}`);
    const voteOncePerIPEnabled = localStorage.getItem(`voteOncePerIP_${pollId}`) === "true";

    // Set voted based on conditions
    setVoted(Boolean(hasVoted && voteOncePerIPEnabled));
    fetchPollData();
  }, [pollId]);

  const fetchVoteCounts = async () => {
    try {
      const response = await axios.get(`https://web1002.web.portfolios.mknazzal.com/server/GetVoteCounts.php?pollId=${pollData.id}`);
      if (response.data.success && response.data.voteCounts) {
        setVoteCounts(response.data.voteCounts);
      }
    } catch (err) {
      setError("Could not fetch vote counts. " + err.message);
    }
  };

  const handleVote = async (answer) => {
    if (voted && pollData.settings.voteOncePerIP) {
      setError("You have already voted on this poll.");
      return;
    }

    try {
      const response = await axios.post("https://web1002.web.portfolios.mknazzal.com/server/SubmitVote.php", {
        pollId,
        Id: pollData.id,
        answer
      });
      if (response.data.success) {
        if (pollData.settings.voteOncePerIP) {
          localStorage.setItem(`voted_${pollId}`, true);
          localStorage.setItem(`voteOncePerIP_${pollId}`, pollData.settings.voteOncePerIP);
        }
        setVoted(true);
        setSuccessMessage("Thank you for voting!");
        setError(null);
        fetchVoteCounts(); // Fetch vote counts after voting
      } else {
        setError(response.data.message || "Failed to submit vote. Please try again.");
      }
    } catch (err) {
      setError("Could not submit vote. Please try again later. " + err.message);
    }
  };

  useEffect(() => {
    if (voted) {
      fetchVoteCounts();
    }
  }, [voted]);

  if (error) return <div className="alert alert-danger text-center">{error}</div>;
  if (!pollData) return <div className="text-center text-light">Loading...</div>;

  return (
    <div className="container my-5">
      <div className="card poll-card shadow-lg">
        <div className="card-body">
          {successMessage && (
            <div className="alert alert-success text-center">{successMessage}</div>
          )}
          <h2 className="text-center poll-title">{pollData.title}</h2>
          <p className="text-center poll-description">{pollData.description}</p>
          <hr className="divider" />

          <div className="d-flex flex-column gap-3 align-items-center">
            {pollData.answers && pollData.answers.map((answer, index) => (
              <button 
                className="btn poll-option-button" 
                key={index} 
                onClick={() => handleVote(answer)}
                disabled={voted || (new Date() > expiryDate)}
              >
                {answer} {voted && voteCounts && `(${voteCounts[`option${index + 1}Count`] || 0} votes)`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
