import { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
    IconButton,
    Toolbar,
    Avatar,
    TextField,
    Grid,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    MenuItem,
    Menu,
    Checkbox,
    FormControlLabel,
    DialogActions,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import React, { useEffect } from "react"
import socketServices from "../../../../SocketService/SocketServices";
import { fetchUserProfilesBySocietyId } from "../../../../Redux/Slice/SuperAdmin/userProfilesSlice";
import { useSelector, useDispatch } from "react-redux";
function Community() {
    const [groups, setGroups] = useState([])
    const bottomRef = React.createRef();
    const [inputValue, setInputValue] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpen1, setDialogOpen1] = useState(false);
    const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
    const [emojiMenuAnchorEl, setEmojiMenuAnchorEl] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [selectedGroupMessages, setSelectedGroupMessages] = useState([])
    const societyId = "6683b57b073739a31e8350d0"
    const [selectedGroup, setSelectedGroup] = useState();
    const dispatch = useDispatch()
    const { profiles } = useSelector((state) => state.UserProfile)
    const [selectedResidents, setSelectedResidents] = useState([]);
    const [jacksonHeightsMembers, setJacksonHeightsMembers] = useState([
        {
            name: "Preeti",
            image:
                "https://www.imagella.com/cdn/shop/products/3f65e111ddb5f7771c328423cd160b83.jpg?v=1707664853&width=300",
            typing: false,
            lastSeen: "Last seen at 11:30",
        },
        {
            name: "Pinder whatzap",
            image:
                "https://photosly.net/wp-content/uploads/2023/12/sad-girl-dp49.jpg",
            typing: false,
            lastSeen: "Last seen at 10:00",
        },
        {
            name: "Priyanshu pune",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMA4hF-5eDpdU6i4AF15xzA9cRZi7zal34bA&s",
            typing: false,
            lastSeen: "Last seen at 09:00",
        },
        {
            name: "Harash-mumbai",
            image:
                "https://www.imagella.com/cdn/shop/products/d88c9f2ecee2a248b8f8c06502cd7246.jpg?v=1707663984&width=300",
            typing: false,
            lastSeen: "Last seen at 08:00",
        },
    ]);
    // useEffect(() => {
    //     // Initialize the socket connection
    //     socketServices.initializeSocket();
    //     const handleNewMessage = (newMessage) => {
    //         setMessages((prevMessages) => [...prevMessages, newMessage]);
    //         // setMessages([newMessage]);
    //     };
    //     socketServices.emit('getGroupsForAdmin', { societyId });
    //     socketServices.on('chatHistory', handleChatHistory);
    //     socketServices.on('newMessage', handleNewMessage);
    //     // Handle receiving the list of groups
    //     socketServices.on('Admingroups', (data) => {
    //         setGroups(data);
    //     });
    //     return () => {
    //         socketServices.removeListener('Admingroups');
    //         socketServices.removeListener('chatHistory', handleChatHistory);
    //         socketServices.removeListener('newMessage', handleNewMessage);
    //     };
    // }, [])
    // const handleNewMessage = (newMessage) => {
    //     console.log(newMessage, "new Message")
    //     setSelectedGroupMessages((prevMessages) => [...prevMessages, newMessage]);
    // };
    useEffect(() => {
        socketServices.initializeSocket();
        const handleNewMessage = (message) => {
            console.log('Received', message);
            setSelectedGroupMessages((prevMessages) => [...prevMessages, message]);
        };
        const handleNewResident = (id) => {
            console.log('groupoid', id);
            setSelectedGroup(id);
        };
        const handleChatHistory = (chatHistory) => {
            console.log(chatHistory, "chathistory");
            setSelectedGroupMessages(chatHistory);
        };
        const handleChatHistoryError = (error) => {
            console.error('Error fetching chat history:', error);
        };
        const handleError = (error) => {
            console.error('Error:', error.message);
        };
        // Emit and listen to socket events
        socketServices.emit('getGroupsForAdmin', { societyId });
        socketServices.on('newMessage', handleNewMessage);
        socketServices.on('residentsUpdated', handleNewResident);
        socketServices.on('chatHistory', handleChatHistory);
        socketServices.on('chatHistoryError', handleChatHistoryError);
        socketServices.on('error', handleError);
        socketServices.on('Admingroups', (data) => {
            setGroups(data);
        });
        return () => {
            socketServices.removeListener('newMessage', handleNewMessage);
            socketServices.removeListener('chatHistory', handleChatHistory);
            socketServices.removeListener('chatHistoryError', handleChatHistoryError);
            socketServices.removeListener('error', handleError);
            socketServices.removeListener('Admingroups');
        };
    }, [societyId, selectedGroup]);
    useEffect(() => {
        if (selectedGroup) {
            socketServices.emit('getChatHistory', selectedGroup);
            socketServices.emit('joinGroup', selectedGroup);
        }
    }, [selectedGroup]);
    const handleGroupSelect = (group) => {
        setSelectedGroup(group._id);
        setSelectedGroupMessages(group.messages);
        // socketServices.emit('getChatHistory', group._id);
        // socketServices.emit('joinGroup', group._id);
    };
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', });
        }
    }, [selectedGroupMessages]);
   

    const handleOpenEmojiMenu = (event) => {
        setEmojiMenuAnchorEl(event.currentTarget);
    };
    const handleCloseEmojiMenu = () => {
        setEmojiMenuAnchorEl(null);
    };
    const handleEmojiSelect = (emoji) => {
        setInputValue((prev) => prev + emoji);
        setEmojiMenuAnchorEl(null);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleActionClick = (event) => {
        setActionMenuAnchorEl(event.currentTarget);
    };
    const handleCloseActionMenu = () => {
        setActionMenuAnchorEl(null);
    };
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogOpen1 = () => {
        dispatch(fetchUserProfilesBySocietyId(societyId))
        setDialogOpen1(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleDialogClose1 = () => {
        setDialogOpen1(false);
    };
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleSendMessage = () => {
        if (inputValue.trim() !== "" && selectedGroup) {
            const newMessage = {
                groupId: selectedGroup,
                senderId: societyId,
                content: inputValue,
                sender: { _id: societyId, name: 'You' },
                time: Date.now()
            };
            // Emit the new message to the server
            // setSelectedGroupMessages((prevMessages) => [...prevMessages, newMessage]);
            socketServices.emit('sendMessage', newMessage);
            setInputValue("")
            socketServices.emit('getChatHistory', newMessage.groupId);
            // setSelectedGroupMessages((prevMessages) => [...prevMessages, newMessage]);
            setSelectedGroup(newMessage.groupId)
            // window.scrollTo(0, document.body.scrollHeight)
        }
    };
    const handleRemoveMember = (id) => {
        console.log(id, "selcted person")
        socketServices.emit("remove-resident", {
            residentId: id,
            groupId: selectedGroup,
            societyId,

        })
        socketServices.emit('getGroupsForAdmin', { societyId });
        handleDialogClose1()
    };
    const handleHeaderClick = () => {
        setDialogOpen(!dialogOpen);
    };
    const handleResindetSave = () => {
        socketServices.emit("add-residents", {
            groupId: selectedGroup,
            societyId,
            residentIds: selectedResidents
        })
        socketServices.emit('getGroupsForAdmin', { societyId });
        handleDialogClose1();
    };
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    // const groupMessagesByMonth = (messages) => {
    //     return messages.reduce((acc, msg) => {
    //         const date = new Date(msg.createdAt);
    //         const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., 2024-7
    //         if (!acc[monthYear]) {
    //             acc[monthYear] = [];
    //         }
    //         acc[monthYear].push(msg);
    //         return acc;
    //     }, {});
    // };
    // const groupedMessages = groupMessagesByMonth(selectedGroupMessages);




    const handleCheckboxChange = (residentId) => {
        setSelectedResidents((prevSelected) =>
            prevSelected.includes(residentId)
                ? prevSelected.filter((id) => id !== residentId)
                : [...prevSelected, residentId]
        );
    };

    console.log(selectedResidents)
    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={3} sx={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
                    <Paper elevation={0} sx={{ bgcolor: "#F5F5F5", p: 2 }}>
                        <List>
                            <ListItem>
                                <Typography variant="body1" sx={{ fontFamily: "Red Hat Display, sans-serif", fontWeight: 600, fontSize: 17 }}>Groups</Typography>
                            </ListItem>
                            {groups.map((group) => (
                                <React.Fragment key={group._id}>
                                    <ListItem
                                        button
                                        selected={selectedGroup === group._id}
                                        onClick={() => handleGroupSelect(group)}
                                        sx={{
                                            fontFamily: "Red Hat Display, sans-serif",
                                            fontWeight: 600,
                                            fontSize: 17,
                                        }}
                                    >
                                        <ListItemText
                                            primary={group ? group.groupName : ""}
                                            secondary={group ? `${group.members?.length}+ Members` : ""}
                                            sx={{
                                                fontFamily: "Red Hat Display, sans-serif",
                                                fontWeight: 600,
                                                fontSize: 18,
                                            }}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#EFEAE2",
                        }}
                    >
                        <Box
                            sx={{
                                p: 2,
                                borderBottom: "1px solid lightgray",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                position: "sticky",
                                top: 0,
                                bgcolor: "#FFFFFF",
                                zIndex: 1,
                            }}
                            onClick={() => setDialogOpen(!dialogOpen)}
                            style={{ cursor: "pointer" }}
                        >
                            <Toolbar>
                                <Avatar>
                                    {selectedGroup ? selectedGroup[0].toUpperCase() : "G"}
                                </Avatar>
                                <Box ml={2} flexGrow={1}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: "Red Hat Display, sans-serif",
                                            fontWeight: 600,
                                            fontSize: 18,
                                        }}
                                    >
                                        {selectedGroup
                                            ? groups.find((group) => group._id === selectedGroup).groupName
                                            : "Select a Group"}
                                    </Typography>
                                    {selectedGroup && (
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{
                                                fontFamily: "Red Hat Display, sans-serif",
                                                fontWeight: 600,
                                                fontSize: 18,
                                            }}
                                        >
                                            {`${groups.find((group) => group._id === selectedGroup)?.members.length}+ Members`}
                                        </Typography>
                                    )}
                                </Box>
                            </Toolbar>
                        </Box>
                        {dialogOpen ? (
                            <Box p={2}>
                                <Grid
                                    item
                                    sx={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: "Red Hat display, sans-serif",
                                            fontWeight: 600,
                                            fontSize: 18,
                                        }}
                                    >
                                        Group Info
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={handleDialogOpen1}
                                        sx={{
                                            fontFamily: "Red Hat Display, sans-serif",
                                            fontWeight: 600,
                                            color: "#192c4c",
                                            border: "1px solid #192c4c",
                                            fontSize: 15,
                                            marginRight: 2,
                                            "&:hover": { border: "1px solid #192c4c" },
                                        }}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                                <Grid
                                    container
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <List
                                        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                                    >
                                        {groups
                                            .find((group) => group._id === selectedGroup)
                                            ?.members.map((member, index) => (
                                                <ListItem key={index} sx={{ width: "100%" }}>
                                                    {console.log(member.residents._id)}
                                                    <Avatar src={member?.image} />
                                                    <ListItemText
                                                        sx={{
                                                            marginLeft: 2,
                                                            fontFamily: "Red Hat display, sans-serif",
                                                            fontWeight: 300,
                                                            fontSize: 16,
                                                        }}
                                                        primary={member.residents?.name}
                                                        secondary={
                                                            member.residents?.userType ? `${member.residents.userType} ${member.residents.flatNumber}` : ""
                                                        }
                                                    />
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => handleRemoveMember(member.residents._id)}
                                                        sx={{ ml: 2 }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </ListItem>
                                            ))}
                                    </List>
                                </Grid>
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ flex: 1, overflowY: "auto", p: 2, height: '100vh' }}>
                                    <List>
                                        {selectedGroupMessages.map((msg, index) => (
                                            <ListItem
                                                key={index}
                                                sx={{
                                                    justifyContent: msg.sender === null || msg.sender === societyId ? 'flex-end' : 'flex-start',
                                                    display: 'flex',
                                                }}
                                            >
                                                <Paper
                                                    sx={{
                                                        backgroundColor: msg.sender === null || msg.sender === societyId ? '#dcf8c6' : '#ffffff',
                                                        borderRadius: 2,
                                                        p: 1,
                                                        maxWidth: '60%',
                                                        wordWrap: 'break-word',
                                                    }}
                                                >
                                                    <Typography variant="body1">{msg.sender === null || msg.sender === societyId ? "You" : msg.sender.name}</Typography>
                                                    <Typography variant="body1">{msg.content}</Typography>
                                                    <Typography variant="body2" align="right" color="textSecondary">
                                                        {(msg.createdAt === undefined ? formatTime(new Date().toISOString()) : formatTime(msg.createdAt))}
                                                    </Typography>
                                                </Paper>
                                            </ListItem>
                                        ))}
                                        <div ref={bottomRef} /> {/* Element to scroll into view */}
                                    </List>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        p: 1,
                                        position: "sticky",
                                        bottom: 0,
                                        bgcolor: "#FFFFFF",
                                        zIndex: 1,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        placeholder="Type a message"
                                        variant="outlined"
                                        size="small"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                handleSendMessage();
                                            }
                                        }}
                                        sx={{ mr: 1 }}
                                        InputProps={{
                                            endAdornment: (
                                                <React.Fragment>
                                                    <IconButton onClick={handleOpenEmojiMenu}>
                                                        <InsertEmoticonIcon />
                                                    </IconButton>
                                                    <IconButton>
                                                        <MicIcon />
                                                    </IconButton>
                                                    <IconButton>
                                                        <InsertDriveFileIcon />
                                                    </IconButton>
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                    <Menu
                                        anchorEl={emojiMenuAnchorEl}
                                        open={Boolean(emojiMenuAnchorEl)}
                                        onClose={handleCloseEmojiMenu}
                                    >
                                        {Array.from({ length: 5 }).map((_, rowIndex) => (
                                            <MenuItem key={`row-${rowIndex}`}>
                                                {[
                                                    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
                                                    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
                                                    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓",
                                                    "😎", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️",
                                                    "😣", "😖", "😫", "😩", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳",
                                                ].slice(rowIndex * 10, (rowIndex + 1) * 10).map((emoji, index) => (
                                                    <IconButton
                                                        key={`emoji-${rowIndex}-${index}`}
                                                        onClick={() => handleEmojiSelect(emoji)}
                                                    >
                                                        {emoji}
                                                    </IconButton>
                                                ))}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    <IconButton
                                        color="primary"
                                        aria-label="send"
                                        onClick={handleSendMessage}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                            </>
                        )}
                    </Paper>
                    <Dialog open={dialogOpen1} onClose={handleDialogClose1}>
                        <DialogTitle
                            sx={{
                                fontFamily: 'Red Hat Display, sans-serif',
                                fontWeight: 600,
                                fontSize: 19,
                            }}
                        >
                            Select Member
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    width: '100%',
                                    marginBottom: '10px',
                                    fontFamily: 'Red Hat Display, sans-serif',
                                }}
                            />
                            <Grid container spacing={2}>
                                {profiles
                                    ?.filter((eachRes) => {
                                        // Extract member IDs for the selected group
                                        const memberIds = groups.find(group => group._id === selectedGroup)?.members.map(member => member.residents._id) || [];
                                        // Filter profiles to include only those whose ID is not in the member IDs
                                        return !memberIds.includes(eachRes._id);
                                    })
                                    .map((eachRes) => (
                                        <Grid item xs={12} key={eachRes._id}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={selectedResidents.includes(eachRes._id)}
                                                        onChange={() => handleCheckboxChange(eachRes._id)}
                                                    />
                                                }
                                                label={
                                                    <div>
                                                        <span
                                                            style={{
                                                                fontFamily: 'Red Hat Display, sans-serif',
                                                                fontWeight: 400,
                                                                fontSize: 17,
                                                            }}
                                                        >
                                                            {eachRes.name}
                                                        </span>
                                                        <span
                                                            style={{
                                                                display: 'block',
                                                                fontFamily: 'Red Hat Display, sans-serif',
                                                                fontWeight: 400,
                                                                fontSize: 17,
                                                            }}
                                                        >
                                                            {`${eachRes.flatNumber} ${eachRes.userType}`}
                                                        </span>
                                                    </div>
                                                }
                                                sx={{ mb: 1 }}
                                            />
                                        </Grid>
                                    ))}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleResindetSave}
                                variant="contained"
                                sx={{
                                    fontFamily: 'Red Hat Display, sans-serif',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    backgroundColor: '#800336',
                                    '&:hover': { backgroundColor: '#800336' },
                                }}
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </Box >
    );
}

export default Community;