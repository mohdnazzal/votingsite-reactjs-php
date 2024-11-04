import { useState, useEffect } from "react"; // React hooks for state and effect
import axios from "axios"; // Library for making HTTP requests
import {
  Card, CardContent, Typography, Box, Divider, Grid, Chip, Button, Collapse, Tooltip,
} from "@mui/material"; // Material-UI components
import { AccessTime, ExpandMore, ExpandLess, HowToVote } from "@mui/icons-material"; // Material-UI icons
import { styled } from "@mui/system"; // Styled components from Material-UI

// Styled components for PollCard and OptionBox
const PollCard = styled(Card)( {
  marginBottom: "20px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
});

const OptionBox = styled(Box)( {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #e0e0e0",
});

const PollsList = () => {
  const [polls, setPolls] = useState([]); // State to store polls
  const [expandedPollId, setExpandedPollId] = useState(null); // State to track expanded poll
  const storedUser = sessionStorage.getItem("userID"); // Retrieve user ID from sessionStorage

  // Effect to fetch polls when the component mounts
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          `https://web1002.web.portfolios.mknazzal.com/server/PollDetails.php?userID=${storedUser}`
        );
        if (response.data.success) {
          setPolls(response.data.polls); // Set fetched polls to state
        } else {
          console.error("Failed to fetch polls:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls(); // Call the fetch function
  }, [storedUser]); // Dependency on storedUser

  // Function to toggle the expansion of a poll card
  const toggleExpand = (pollId) => {
    setExpandedPollId(expandedPollId === pollId ? null : pollId);
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Polls
      </Typography>
      {polls.length > 0 ? (
        polls.map((poll) => {
          const totalVotes = poll.optionsCount.reduce((acc, count) => acc + count, 0); // Calculate total votes

          return (
            <PollCard key={poll.id}>
              <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item xs={8}>
                    <Typography variant="h6" component="h2">
                      {poll.title}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Button
                      size="small"
                      onClick={() => toggleExpand(poll.id)} // Toggle expansion on button click
                      endIcon={expandedPollId === poll.id ? <ExpandLess /> : <ExpandMore />}
                    >
                      {expandedPollId === poll.id ? "Hide Details" : "Show Details"}
                    </Button>
                  </Grid>
                </Grid>

                <Typography variant="body2" color="textSecondary">
                  <strong>Created At:</strong> {poll.created_at} | 
                  <strong> Expires:</strong> {poll.settings.expiryDate} |
                  <strong> Total Votes:</strong> {totalVotes}
                </Typography>
                
                {/* Collapsible Section for Detailed Information */}
                <Collapse in={expandedPollId === poll.id} timeout="auto" unmountOnExit>
                  <Divider sx={{ margin: "10px 0" }} />

                  {/* Poll URL */}
                  <Box sx={{ mb: 1 }}>
                    <Tooltip title="Poll URL">
                      <Typography variant="body2" color="primary">
                        URL: <a href={"/polls/" + poll.vote_url} target="_blank" rel="noopener noreferrer">Get Link</a>
                      </Typography>
                    </Tooltip>
                  </Box>
                  
                  {/* Poll Options with Counts */}
                  {poll.options.map((option, index) => (
                    <OptionBox key={index}>
                      <Typography variant="body1">{option}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Votes: {poll.optionsCount[index]}
                      </Typography>
                    </OptionBox>
                  ))}

                  {/* Poll Settings */}
                  <Grid container spacing={1} sx={{ marginTop: "10px" }}>
                    <Grid item xs={6}>
                      <Tooltip title="Expiry Date">
                        <Chip
                          icon={<AccessTime />}
                          label={`Expires: ${poll.settings.expiryDate}`}
                          color="secondary"
                          variant="outlined"
                          size="small"
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Tooltip title="Vote Once Per IP">
                        <Chip
                          icon={<HowToVote />}
                          label={poll.settings.voteOncePerIP ? "Vote Once Only" : "Multiple Votes Allowed"}
                          color={poll.settings.voteOncePerIP ? "primary" : "default"}
                          variant="outlined"
                          size="small"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Collapse>
              </CardContent>
            </PollCard>
          );
        })
      ) : (
        <Typography variant="body1">No polls available.</Typography> // Message if no polls found
      )}
    </Box>
  );
};

export default PollsList;
