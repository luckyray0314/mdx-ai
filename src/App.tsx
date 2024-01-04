// import Container from "@mui/material/Container";
import Header from "./Header";
import {
  Box,
  Stack,
  Button,
  IconButton,
  Grid,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
// import Sidebar from "./Sidebar";

interface Message {
  id: number;
  text: string;
  sender: string;
}

export default function Blog() {
  // const [selectedIndex, setSelectedIndex] = useState(1);
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [response, setResponse] = useState("");
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // console.log('prompt----------', prompt);
  // const handleListItemClick = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   index: number
  // ) => {
  //   setSelectedIndex(index);
  // };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (e?.key !== "Enter") {
      return;
    }
    if (e.key === "Enter" && (e.ctrlKey || e.shiftKey)) {
      setPrompt(prompt + "\n");
      // return;
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!loading) sendPrompt();
    }
  };

  const sendPrompt = async () => {
    setLoading(true);
    // setErrorMessage("");

    if (prompt.trim() == "") {
      console.log("prompt is empty");
      // setErrorMessage("Prompt cannot be empty!");
      // setLoading(false);
      return;
    }

    console.log("-----prompt-------", prompt);
    let num = 0;
    if (messages != null) {
      num = messages?.length;
      setMessages([...messages, { id: num, text: prompt, sender: "user" }]);
    } else {
      num = 0;
      setMessages([{ id: 0, text: prompt, sender: "user" }]);
    }

    await fetch("http://92.205.177.42:5050/api/proprietary-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => {
        console.log("response--------", response);
        return response.json();
      })
      .then((data) => {
        console.log("Result", data.result);

        setResponse(data.result);
        // setOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Network Error! Please try again.");
      });
    setLoading(false);
  };

  useEffect(() => {
    setPrompt("");
    if (messages != null)
      setMessages([
        ...messages,
        { id: messages.length, text: response, sender: "bot" },
      ]);
  }, [response]);

  useEffect(() => {
    setPrompt("");
    if (messages != null && errorMessage != "") {
      setMessages([
        ...messages,
        { id: messages.length, text: errorMessage, sender: "bot" },
      ]);
      setErrorMessage("");
    }
  }, [errorMessage]);

  console.log("Message-------", messages);
  const Message = ({ message }: { message: Message }) => {
    return (
      <>
        <Stack direction={"row"} spacing={2} color={"white"}>
          {message.sender == "user" ? (
            <AccountBoxIcon />
          ) : (
            <DesktopWindowsIcon />
          )}
          <Typography sx={{ wordWrap: "break-word", width: "95%" }}>
            {message.text}
          </Typography>
        </Stack>
        {/* <Divider
          sx={{
            my: 2,
            width: "80%",
            mx: "auto",
            borderColor: "#6C5E8D",
          }}
        /> */}
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10vh",
          height: "calc(90vh)",
          paddingY: 5,
          paddingX: 5,
        }}
      >
        <Header />
        <Stack
          direction="row"
          spacing={10}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          {/* <Box
            sx={{
              width: "30%",
              border: 2,
              borderColor: "#C9A4F8",
              borderRadius: "40px",
              boxShadow: "0px 0px 16px 0px #C9A4F8",
              padding: 5,
            }}
          >
            <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
              <Button
                color="secondary"
                startIcon={<AddIcon />}
                sx={{ width: "100%", height: "2.8rem" }}
                variant="contained"
              >
                New Chat
              </Button>
              <Button
                color="secondary"
                startIcon={<DeleteIcon />}
                sx={{ width: "100%", height: "2.8rem" }}
                variant="outlined"
              >
                Delete All
              </Button>
            </Stack>
            <Divider sx={{ border: "1px solid #C9A4F8" }} />
            <List
              sx={{
                maxHeight: "65vh",
                position: "relative",
                overflow: "auto",
                // mt: 2,
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                  sx={{
                    px: 3,
                    backgroundColor: "#6C5E8D",
                    border: 2,
                    mt: 2,
                    borderRadius: "25px",
                    borderColor: "#C9A4F8",
                    color: "#C9A4F8",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    "&:hover, &:focus": { "& svg": { opacity: 1 } },
                  }}
                >
                  <ListItemText primary="New Chat" />
                  <IconButton sx={{ color: "#C9A4F8" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: "#C9A4F8" }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemButton>
              </ListItem>
            </List>
          </Box> */}
          <Box
            sx={{
              width: "70%",
              // border: 2,
              borderColor: "#C9A4F8",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                // mt: "-50px",
                mb: 2,
                p: 2,
                maxWidth: "90%",
                width: "90%",
                mx: "auto",
                "&::-webkit-scrollbar": {
                  width: "12px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#e1e1e1",
                  borderRadius: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#C9A4F8",
                  borderRadius: "6px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#6C5E8D",
                },
              }}
            >
              {messages == null && (
                <>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      color: "#736796",
                      fontSize: "4rem",
                      fontWeight: "bold",
                    }}
                  >
                    Welcome to
                  </Typography>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      color: "#736796",
                      fontSize: "4rem",
                      fontWeight: "bold",
                    }}
                  >
                    Proprietary AI ChatGPT!
                  </Typography>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      color: "#736796",
                      // fontSize: "6rem",
                      fontWeight: "bold",
                    }}
                  >
                    Proprietary AI can assist you with various proprietary
                    information.
                  </Typography>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      color: "#736796",
                      // fontSize: "6rem",
                      fontWeight: "bold",
                    }}
                  >
                    You can start a conversation here. Please input your
                    question.
                  </Typography>
                </>
              )}
              {messages?.map((message) => (
                <>
                  <Message key={message.id} message={message} />
                  <Divider
                    sx={{
                      my: 2,
                      width: "80%",
                      mx: "auto",
                      borderColor: "#6C5E8D",
                    }}
                  />
                </>
              ))}
            </Box>
            <Box sx={{ color: "white", width: "75%", mx: "auto" }}>
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {/* <Grid item xs={1}>
                  <IconButton size="large" color="secondary">
                    <AttachFileIcon fontSize="inherit" />
                  </IconButton>
                </Grid> */}
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    sx={{
                      "& textarea": {
                        // Or if single line, "& input"
                        color: "white", // Customizing the text color of the input
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            size="small"
                            color="secondary"
                            title="Attach files"
                          >
                            <AttachFileIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        "& svg": {
                          fill: "#C9A4F8",
                        },
                        "& fieldset": {
                          border: "2px solid #C9A4F8!important",
                          borderRadius: 2,
                        },
                        "&:hover fieldset": {
                          // border: "2px solid #C9A4F8!important",
                          // borderRadius: 0,
                        },
                        "&:focus-within fieldset, &:focus-visible fieldset": {
                          boxShadow: "0px 0px 16px 0px #C9A4F8",
                        },
                      },
                    }}
                    placeholder="Type a message"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleEnter}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    title="Send"
                    sx={{
                      borderRadius: "50%",
                      width: "45px",
                      height: "64px",
                      "&.Mui-disabled": {
                        backgroundColor: "#6C5E8D", // Custom background color when button is disabled
                        color: "white", // Custom text color when button is disabled
                      },
                    }}
                    onClick={sendPrompt}
                    disabled={loading}
                  >
                    {/* <SendIcon /> */}
                    {loading ? (
                      <CircularProgress size={24} style={{ color: "white" }} />
                    ) : (
                      <SendIcon />
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
