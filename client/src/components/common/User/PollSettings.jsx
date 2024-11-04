import { useState, useEffect } from "react"; // Importing necessary hooks from React

export default function PollSettings() {
  // Retrieve values from sessionStorage or set default values
  const [voteOnce, setVoteOnce] = useState(() => {
    const savedVoteOnce = sessionStorage.getItem("voteOncePerIP");
    return savedVoteOnce ? JSON.parse(savedVoteOnce) : false; // Default to false if not set
  });

  const [expiryDate, setExpiryDate] = useState(() => {
    const savedExpiryDate = sessionStorage.getItem("pollExpiryDate");
    return savedExpiryDate ? savedExpiryDate : ""; // Default to empty string if not set
  });

  // Save voteOnce and expiryDate to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("voteOncePerIP", JSON.stringify(voteOnce)); // Store as JSON string
    sessionStorage.setItem("pollExpiryDate", expiryDate); // Store expiry date directly
  }, [voteOnce, expiryDate]);

  // Handle checkbox change for Vote Once per IP
  const handleVoteOnceChange = (event) => {
    setVoteOnce(event.target.checked); // Update state based on checkbox
  };

  // Handle input change for Poll Expiry Date
  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value); // Update state with new expiry date
  };

  return (
    <div className="container mt-5">
      <form method="POST" className="p-4 border rounded shadow-sm bg-light">
        {/* Checkbox for Vote Once per IP setting */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="voteOnceCheckbox"
            checked={voteOnce} // Controlled checkbox
            onChange={handleVoteOnceChange} // Handle change event
          />
          <label className="form-check-label" htmlFor="voteOnceCheckbox">
            Vote Once per IP
          </label>
        </div>

        {/* Input for Poll Expiry Date */}
        <div className="mt-3">
          <label style={{ marginRight: "20px" }} htmlFor="pollExpiryDate" className="form-label">
            Poll Expiry Date
          </label>
          <input
            size={80} // Set input width
            type="datetime-local" // Date and time input type
            id="pollExpiryDate"
            name="pollExpiryDate"
            value={expiryDate} // Controlled input
            onChange={handleExpiryDateChange} // Handle change event
          />
        </div>
      </form>
    </div>
  );
}
