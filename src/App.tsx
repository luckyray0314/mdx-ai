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
import React, { useState, useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ReactMarkdown from "react-markdown";

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

  const newTextRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  function scrollDomToBottom() {
    const dom = newTextRef.current;
    if (dom) {
      requestAnimationFrame(() => {
        setAutoScroll(true);
        dom.scrollTo(0, dom.scrollHeight);
      });
    }
  }

  useEffect(() => {
    if (autoScroll) {
      scrollDomToBottom();
    }
  });

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
      // console.log("prompt is empty");
      // setErrorMessage("Prompt cannot be empty!");
      // setLoading(false);
      return;
    }

    // console.log("-----prompt-------", prompt);
    let num = 0;
    if (messages != null) {
      num = messages?.length;
      setMessages([...messages, { id: num, text: prompt, sender: "user" }]);
    } else {
      num = 0;
      setMessages([{ id: 0, text: prompt, sender: "user" }]);
    }

    await fetch("http://212.192.31.92:5098/api/proprietary-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => {
        // console.log("response--------", response);
        return response.json();
      })
      .then((data) => {
        // console.log("Result", data.result);

        setResponse(data.result);
        // setOpen(true);
      })
      .catch(() => {
        // console.error(error);
        setErrorMessage("Network Error! Please try again.");
      });
    scrollDomToBottom();
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

  // console.log("Message-------", messages);
  const Message = ({ message }: { message: Message }) => {
    return (
      <>
        <Stack direction={"row"} spacing={2} color={"white"}>
          <Box>
            {message.sender == "user" ? (
              <AccountBoxIcon sx={{ mt: "16px" }} />
            ) : (
              <DesktopWindowsIcon sx={{ mt: "16px" }} />
            )}
          </Box>
          <Box sx={{ wordWrap: "break-word", width: "95%" }}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </Box>
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
              borderColor: "#66BB6A",
              borderRadius: "40px",
              boxShadow: "0px 0px 16px 0px #66BB6A",
              padding: 5,
            }}
          >
            <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
              <Button
                color="success"
                startIcon={<AddIcon />}
                sx={{ width: "100%", height: "2.8rem" }}
                variant="contained"
              >
                New Chat
              </Button>
              <Button
                color="success"
                startIcon={<DeleteIcon />}
                sx={{ width: "100%", height: "2.8rem" }}
                variant="outlined"
              >
                Delete All
              </Button>
            </Stack>
            <Divider sx={{ border: "1px solid #66BB6A" }} />
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
                    borderColor: "#66BB6A",
                    color: "#66BB6A",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    "&:hover, &:focus": { "& svg": { opacity: 1 } },
                  }}
                >
                  <ListItemText primary="New Chat" />
                  <IconButton sx={{ color: "#66BB6A" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: "#66BB6A" }}>
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
              borderColor: "#66BB6A",
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
                  backgroundColor: "#66BB6A",
                  borderRadius: "6px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#6C5E8D",
                },
              }}
              ref={newTextRef}
              id="newTextElement"
            >
              {messages == null && (
                <>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      color: "#2F684D",
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
                      color: "#2F684D",
                      fontSize: "4rem",
                      fontWeight: "bold",
                    }}
                  >
                    MDX AI Assitant!
                  </Typography>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      color: "#2F684D",
                      // fontSize: "6rem",
                      fontWeight: "bold",
                    }}
                  >
                    MDX AI Assistant an GPT model developed by R Group to
                    support medical device interopablity and configruation
                    support.
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
                      borderColor: "#2F684D",
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
                  <IconButton size="large" color="success">
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
                            color="success"
                            title="Attach files"
                          >
                            <AttachFileIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        "& svg": {
                          fill: "#66BB6A",
                        },
                        "& fieldset": {
                          border: "2px solid #66BB6A!important",
                          borderRadius: 2,
                        },
                        "&:hover fieldset": {
                          // border: "2px solid #66BB6A!important",
                          // borderRadius: 0,
                        },
                        "&:focus-within fieldset, &:focus-visible fieldset": {
                          boxShadow: "0px 0px 16px 0px #66BB6A",
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
                    color="success"
                    title="Send"
                    sx={{
                      borderRadius: "50%",
                      width: "45px",
                      height: "64px",
                      "&.Mui-disabled": {
                        backgroundColor: "#2F684D", // Custom background color when button is disabled
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
