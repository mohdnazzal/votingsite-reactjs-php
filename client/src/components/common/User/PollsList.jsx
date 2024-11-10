import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card, CardContent, Typography, Box, Divider, Grid, Button, Collapse, Tooltip, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { styled } from "@mui/system";

const PollCard = styled(Card)({
  marginBottom: "20px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
});

const OptionBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #e0e0e0",
});

const PollsList = () => {
  const [polls, setPolls] = useState([]);
  const [expandedPollId, setExpandedPollId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editPoll, setEditPoll] = useState({});
  const storedUser = sessionStorage.getItem("userID");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(`https://web1002.web.portfolios.mknazzal.com/server/PollDetails.php?userID=${storedUser}`);
        if (response.data.success) setPolls(response.data.polls);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };
    fetchPolls();
  }, [storedUser]);

  const toggleExpand = (pollId) => {
    setExpandedPollId(expandedPollId === pollId ? null : pollId);
  };

  const handleEditClick = (poll) => {
    setEditPoll(poll);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPoll((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.post('https://web1002.web.portfolios.mknazzal.com/server/editPoll.php', editPoll);
      if (response.data.success) {
        setPolls((prev) => prev.map((p) => (p.id === editPoll.id ? editPoll : p)));
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Error editing poll:", error);
    }
  };

  const handleDeletePoll = async (pollId) => {
    try {
      const response = await axios.post('https://web1002.web.portfolios.mknazzal.com/server/deletePoll.php', { id: pollId });
      if (response.data.success) {
        setPolls((prev) => prev.filter((p) => p.id !== pollId));
      }
    } catch (error) {
      console.error("Error deleting poll:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>My Polls</Typography>
      {polls.length > 0 ? (
        polls.map((poll) => (
          <PollCard key={poll.id}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={8}>
                  <Typography variant="h6">{poll.title}</Typography>
                </Grid>
                <Grid item xs="auto">
                  <Button size="small" onClick={() => toggleExpand(poll.id)} endIcon={expandedPollId === poll.id ? <ExpandLess /> : <ExpandMore />}>
                    {expandedPollId === poll.id ? "Hide Details" : "Show Details"}
                  </Button>
                </Grid>
              </Grid>
              <Typography variant="body2" color="textSecondary">
                <strong>Created At:</strong> {poll.created_at} | <strong>Expires:</strong> {poll.settings.expiryDate} | <strong>Total Votes:</strong> {(poll.optionsCount[0] + poll.optionsCount[1] + poll.optionsCount[2] + poll.optionsCount[3] + poll.optionsCount[4])}
              </Typography>
              <Collapse in={expandedPollId === poll.id} timeout="auto" unmountOnExit>
                <Divider sx={{ margin: "10px 0" }} />
                <Box sx={{ mb: 1 }}>
                  <Tooltip title="Poll URL">
                    <Typography variant="body2" color="primary">URL: <a href={`/polls/${poll.vote_url}`} target="_blank" rel="noopener noreferrer">Get Link</a></Typography>
                  </Tooltip>
                </Box>
                {poll.options.map((option, index) => (
                  <OptionBox key={index}>
                    <Typography variant="body1">{option}</Typography>
                    <Typography variant="body2" color="textSecondary">Votes: {poll.optionsCount[index]}</Typography>
                  </OptionBox>
                ))}
                <Button color="primary" onClick={() => handleEditClick(poll)}>Edit</Button>
                <Button color="secondary" onClick={() => handleDeletePoll(poll.id)}>Delete</Button>
              </Collapse>
            </CardContent>
          </PollCard>
        ))
      ) : (
        <Typography variant="body1">No polls available.</Typography>
      )}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Poll</DialogTitle>
        <DialogContent>
          <TextField name="title" label="Title" fullWidth value={editPoll.title || ''} onChange={handleEditChange} />
          <TextField name="description" label="Description" fullWidth multiline rows={3} value={editPoll.description || ''} onChange={handleEditChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PollsList;
