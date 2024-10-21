
import {
    Box, Button, Grid, Tabs, Tab, Typography, Dialog, DialogTitle,
    DialogContent, TextField, DialogActions, Chip, LinearProgress
} from "@mui/material";
import React, { useEffect, useState } from "react";
import socketServices from "../../../../SocketService/SocketServices";
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchUserProfilesBySocietyId } from "../../../../Redux/Slice/SuperAdmin/userProfilesSlice";
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const Polls = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [polls, setPolls] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        description: '',
        option: [''],
        endDate: '',
        time: '',
        type: 'Individual',
        block: []
    });
    const dispatch = useDispatch()
    const societyId = "6683b57b073739a31e8350d0";
    const { profiles } = useSelector((state) => state.UserProfile)
    useEffect(() => {
        dispatch(fetchUserProfilesBySocietyId(societyId))
    }, [societyId])
    useEffect(() => {
        socketServices.initializeSocket();
        socketServices.emit('get_polls_by_society_id', { societyId });
        socketServices.on('pollsUpdated', (updatedPolls) => {
            setPolls(updatedPolls);
        });
        const handlePollsBySocietyId = (fetchedPolls) => {
            console.log()
            setPolls(fetchedPolls);
        };
        const handleVoteUpdate = (data) => {
            console.log(data)
            // alert(data.message);
            setPolls(prevPolls => {
                const updatedPollIndex = prevPolls.findIndex(poll => poll._id === data.votes._id);
                if (updatedPollIndex !== -1) {
                    const updatedPolls = [...prevPolls];
                    updatedPolls[updatedPollIndex] = data.votes;
                    return updatedPolls;
                } else {
                    console.warn("Updated poll not found in current state");
                    return prevPolls;
                }
            });
        };
        const handleNewPollCreated = (newPoll) => {
            setPolls((prevPolls) => [newPoll, ...prevPolls]);
        };

        const handleVoteError = (error) => {
            alert(error.message);
        };
        socketServices.on('polls_by_society_id', handlePollsBySocietyId);
        socketServices.on('vote_update', handleVoteUpdate);
        socketServices.on('new_poll_created', handleNewPollCreated);
        socketServices.on('vote_error', handleVoteError);
        return () => {
            socketServices.removeListener('polls_by_society_id', handlePollsBySocietyId);
            socketServices.removeListener('new_poll_created', handleNewPollCreated);
            socketServices.removeListener('vote_update', handleVoteUpdate);
            socketServices.removeListener('vote_error', handleVoteError);
            socketServices.removeListener('pollsUpdated')
        };
    }, [societyId]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleFormChange = (event, index) => {
        const { name, value } = event.target;
        if (name === 'option') {
            const newOptions = [...formData.option];
            newOptions[index] = value;
            setFormData(prevData => ({ ...prevData, option: newOptions }));
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleAddOption = () => {
        setFormData(prevData => ({
            ...prevData,
            option: [...prevData.option, '']
        }));
    };

    const handleRemoveOption = (index) => {
        setFormData(prevData => ({
            ...prevData,
            option: prevData.option.filter((_, i) => i !== index)
        }));
    };

    const handleFormSubmit = () => {
        const poll = {
            question: formData.question,
            Description: formData.description,
            options: formData.option,
            expDate: formData.endDate,
            date: Date.now(),
            time: formData.time,
            pollType: formData.type,
            blocks: formData.block
        };
        socketServices.emit('create_poll', { poll, societyId });
        handleDialogClose();
    };

    // Get the current date and time
    const currentDate = new Date();
    const totalUsers = profiles?.length;
    const collectedVotes = polls.filter(poll => new Date(poll.poll.expDate) > currentDate).map((poll) => (poll.poll.votes.length))
    const balanceVotes = totalUsers - collectedVotes;

    const calculateVotePercentage = (optionVotes, totalVotes) => {
        if (totalVotes === 0) return 0;
        return (optionVotes / totalVotes) * 100;
    };
    const calculateTotalVotingPercentage = (totalVotes, totalResidents = totalUsers) => {
        if (totalResidents === 0) return 0;
        return (totalVotes / totalResidents) * 100;
    };
    const handleDelete = async (pollId) => {
        socketServices.emit('deletePoll', pollId);
    };
    return (
        <>
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                }}
            >
                <Typography variant="h5" sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600", color: "#630000" }}>Polls</Typography>
                <Grid item>
                    <Button variant="outlined" sx={{
                        height: 40, marginLeft: 2, color: "#630000", border: "2px solid #630000", fontWeight: "600", '&:hover': {
                            backgroundColor: '#630000',
                            color: "#fff",
                            borderColor: "#630000"
                        },
                    }}
                        onClick={handleDialogOpen}>Create</Button>
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1, marginBottom: "20px", alignItems: "center", width: "100%" }}>
                <Tabs value={activeTab} onChange={handleTabChange} justifyContent="space-between" sx={{ width: "100%" }} >
                    <Tab label="Active Polls" sx={{ marginLeft: "25%" }} />
                    <Tab label="Closed Polls" sx={{ marginLeft: "25%" }} />
                </Tabs>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {activeTab === 0 && (
                    polls && polls.length > 0 ? (
                        polls.filter(poll => new Date(poll.poll.expDate) > currentDate).map((poll) => {
                            const totalVotes = poll.poll.votes.length;
                            const totalUsers = profiles?.length; // Example total users, replace with actual total
                            const collectedVotes = totalVotes; // Replace with actual collected votes
                            const balanceVotes = totalUsers - collectedVotes;

                            return (
                                <Box key={poll._id} sx={{ backgroundColor: "#fff7ed", border: "1px solid #fdba74", height: "auto", width: "100%", borderRadius: "8px", padding: "15px", marginTop: "10px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item md={8}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <Typography variant="body2">POLL ID: {poll._id}</Typography>
                                                    <Typography variant="body2">Created Date: {new Date(poll.createdAt).toLocaleDateString()} {new Date(poll.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>
                                                </Box>
                                                <Chip
                                                    label={poll.poll.status ? "Active" : "Inactive"}
                                                    variant="outlined"
                                                    sx={{ marginLeft: "30px" }}
                                                />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: "700" }}>{poll.poll.question}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: "400", marginBottom: "10px" }}>
                                                {poll.poll.Description}
                                            </Typography>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <Typography variant="body2">Start Date: {new Date(poll.poll.date).toLocaleDateString()} {new Date(poll.poll.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>
                                                <Typography variant="body2">Expiry Date: {new Date(poll.poll.expDate).toLocaleDateString()} {new Date(poll.poll.expDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>
                                            </Box>
                                            {poll.poll.options.map((option, index) => {
                                                const optionVotes = poll.poll.votes.filter(vote => vote.selectedOption === option).length;
                                                const votePercentage = calculateVotePercentage(optionVotes, totalVotes);
                                                const selectedOptionPercentage = calculateTotalVotingPercentage(optionVotes);
                                                return (
                                                    <Grid>

                                                        <Box key={index} sx={{ marginBottom: 2 }}>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>{option}</Typography>
                                                            <LinearProgress variant="determinate" value={selectedOptionPercentage} sx={{ height: 15, borderRadius: 5, marginTop: 1, backgroundColor: "#fffbeb" }} />
                                                            <Typography variant="body2" sx={{ marginTop: 0.5 }}>{Math.ceil(selectedOptionPercentage)}%</Typography>
                                                        </Box>
                                                    </Grid>
                                                );

                                            })}
                                            <IconButton onClick={() => handleDelete(poll._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item md={4}>
                                            <PieChart
                                                series={[
                                                    {
                                                        data: [
                                                            { id: 0, value: totalUsers, label: 'Total Votes' },
                                                            { id: 1, value: collectedVotes, label: 'Collected' },
                                                            { id: 2, value: balanceVotes, label: 'Balance' },
                                                        ],
                                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                                    },
                                                ]}
                                                height={200}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            );
                        })
                    ) : (
                        <Typography variant="body1">No active polls available.</Typography>
                    )
                )}

                {activeTab === 1 && (
                    polls && polls.length > 0 ? (
                        polls.filter(poll => new Date(poll.poll.expDate) <= currentDate).map((poll) => {
                            const totalVotes = poll.poll.votes.length;
                            const totalUsers = profiles?.length; // Example total users, replace with actual total
                            const collectedVotes = totalVotes; // Replace with actual collected votes
                            const balanceVotes = totalUsers - collectedVotes;

                            return (
                                <Box key={poll._id} sx={{ backgroundColor: "#fef2f2", border: "1px solid #f87171", height: "auto", width: "100%", borderRadius: "8px", padding: "15px", marginTop: "10px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item md={8}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <Typography variant="body2">POLL ID: {poll._id}</Typography>
                                                    <Typography variant="body2">Created Date: {new Date(poll.createdAt).toLocaleDateString()} {new Date(poll.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <Chip
                                                        label="Closed"
                                                        variant="outlined"
                                                        sx={{ marginRight: "15px" }}
                                                    />

                                                </Box>
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: "700" }}>{poll.poll.question}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: "400", marginBottom: "10px" }}>
                                                {poll.poll.Description}
                                            </Typography>
                                            <Box sx={{ marginBottom: 1 }}>
                                                <Typography variant="body2">Start Date: {new Date(poll.poll.date).toLocaleDateString()} {new Date(poll.poll.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>
                                                <Typography variant="body2">Expiry Date: {new Date(poll.poll.expDate).toLocaleDateString()} {new Date(poll.poll.expDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>
                                            </Box>
                                            {poll.poll.options.map((option, index) => {
                                                const optionVotes = poll.poll.votes.filter(vote => vote.selectedOption === option).length;
                                                const votePercentage = calculateVotePercentage(optionVotes, totalVotes);
                                                const selectedOptionPercentage = calculateTotalVotingPercentage(optionVotes);
                                                return (
                                                    <Grid>
                                                        <Box key={index} sx={{ marginBottom: 2 }}>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>{option}</Typography>
                                                            <LinearProgress variant="determinate" value={selectedOptionPercentage} sx={{ height: 15, borderRadius: 5, marginTop: 1, backgroundColor: "#fffbeb" }} />
                                                            <Typography variant="body2" sx={{ marginTop: 0.5 }}>{Math.ceil(selectedOptionPercentage)}%</Typography>
                                                        </Box>

                                                    </Grid>
                                                );
                                            })}
                                            <IconButton onClick={() => handleDelete(poll._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item md={4}>
                                            <PieChart
                                                series={[
                                                    {
                                                        data: [
                                                            { id: 0, value: totalUsers, label: 'Total Votes' },
                                                            { id: 1, value: collectedVotes, label: 'Collected' },
                                                            { id: 2, value: balanceVotes, label: 'Balance' },
                                                        ],
                                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                                    },
                                                ]}
                                                height={200}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            );
                        })
                    ) : (
                        <Typography variant="body1">No closed polls available.</Typography>
                    )
                )}
            </Box>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Create New Poll</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="question"
                        label="Poll Question"
                        type="text"
                        fullWidth
                        value={formData.question}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Poll Description"
                        type="text"
                        fullWidth
                        value={formData.description}
                        onChange={handleFormChange}
                    />
                    {formData.option.map((opt, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <TextField
                                margin="dense"
                                name="option"
                                label={`Option ${index + 1}`}
                                type="text"
                                fullWidth
                                value={opt}
                                onChange={(event) => handleFormChange(event, index)}
                            />
                            <Button onClick={() => handleRemoveOption(index)}>-</Button>
                        </Box>
                    ))}
                    <Button onClick={handleAddOption}>Add Option</Button>
                    <TextField
                        margin="dense"
                        name="endDate"
                        label="End Date"
                        type="date"
                        fullWidth
                        value={formData.endDate}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="time"
                        label="Time"
                        type="time"
                        fullWidth
                        value={formData.time}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="type"
                        label="Poll Type"
                        type="text"
                        fullWidth
                        value={formData.type}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        name="block"
                        label="Block"
                        type="text"
                        fullWidth
                        value={formData.block}
                        onChange={handleFormChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleFormSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Polls;